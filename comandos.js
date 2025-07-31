// Arquivo quê lê as cases no plugins_sistemas pode adicionar novas logicas \\

const fs = require('fs');
const path = require('path');
const {
LerMSG, ReplyMSG,
cmdBan, cmdMarcar, 
permissao, atividade,
cmdLogin, cmdPerfil,
contadorMSG, bemVindo, 
PREFIXO, resposta, yts,
fetchJson, getBuffer, fetch,
NOME_BOT, NUMERO_DONO, NOME_DONO, NUMERO_BOT,
} = require('./exportar');

const cmdFilePath = path.join(__dirname, 'plugins_sistemas/cmd.json'); 

const lerContagemComandos = () => {
if (fs.existsSync(cmdFilePath)) {
const data = fs.readFileSync(cmdFilePath, 'utf8');
return JSON.parse(data); 
} else {
return {}}};

const salvarContagemComandos = (contagem) => {
fs.writeFileSync(cmdFilePath, JSON.stringify(contagem, null, 2))};

// Função para calcular as porcentagens
const calcularPorcentagens = (contagem) => {
  const totalComandos = Object.values(contagem).reduce((acc, count) => acc + count, 0);
const porcentagens = {};
for (const [comando, count] of Object.entries(contagem)) {
porcentagens[comando] = ((count / totalComandos) * 100).toFixed(2)}
return porcentagens};

const adicionarEstrela = (comando, porcentagens) => {
if (Object.keys(porcentagens).length === 0) return comando;  

let maisUsado = Object.keys(porcentagens).reduce((a, b) => porcentagens[a] > porcentagens[b] ? a : b);
return maisUsado === comando ? `${comando} ⭐` : comando};

exports.comandos = async (wxt) => {
wxt.ev.on("messages.upsert", async ({ messages }) => {
const info = messages[0];
if (!info) return;

const { MSG, from, isCommand, comando, args, nomedele, participant, mencionar, numerodele, sender, nomegrupo, isGroup, body, type, isCmd, isBot,} = await LerMSG(info, wxt);

 const { reagir, sendAudio, sendImagen, enviar, sendimglink, enviarGifUrl } = ReplyMSG(wxt, from, info);

const login = await contadorMSG(info, from, participant);
    
const { isAdmin, isBotAdmin, isOwnerGroup } = await permissao(wxt, from, participant, isCommand) || {};

try {
let comandosUsados = lerContagemComandos();

if (comando) {
comandosUsados[comando] = comandosUsados[comando] ? comandosUsados[comando] + 1 : 1;
 salvarContagemComandos(comandosUsados)}

const porcentagens = calcularPorcentagens(comandosUsados);
const comandoComEstrela = adicionarEstrela(comando, porcentagens);

const cmdMaisUsado = async (PREFIXO, login) => {
const comandosUsados = lerContagemComandos();
const sortedComandos = Object.entries(comandosUsados).sort((a, b) => b[1] - a[1]) .slice(0, 4); 

const porcentagens = calcularPorcentagens(comandosUsados);

const comandosComEstrela = sortedComandos.map(([comando, count]) => {
const comandoComEstrela = adicionarEstrela(comando, porcentagens);
return `▪${comandoComEstrela}: *${count} vezes*`;
});
return comandosComEstrela.join("\n");
};

const texto = q = isCommand ? MSG.split(/ +/).slice(1).join(" "): "";

// AQUI A CONSOLE DO BOT CUIDADO 
const logConsole = require('./plugins_sistemas/console.js');

const dados = {
isGroup: isGroup,
isCmd: isCmd,
isBot: isBot,
comando: comando,
sender: sender,
nomegrupo: nomegrupo,
nomedele: nomedele
};
logConsole(dados);


// [ INÍCIO DAS CASES COM PREFIXO ]
switch (comando) {

case 'dono': {
donoo = ` Olá ${nomedele} meu atual dono é o *${NOME_DONO}* aqui esta o contacto dele *${NUMERO_DONO}*`
enviar(donoo)
}
break

case 'criador': {
const sendCriadorMessage = require('./plugins_sistemas/Menus/criador');
sendCriadorMessage(from, sender, nomedele, wxt, NOME_BOT, info);
}
break;
    
case "login":
await cmdLogin(login, enviar, args, from, participant, reagir);
break;

case "menu": {
const enviarMenu = require('./plugins_sistemas/Menus/menu')
await enviarMenu(wxt, from, login, nomedele, PREFIXO, NOME_BOT, cmdMaisUsado, info, enviar);
}
break;

case "ban": case "remover": case "banir":
if (!login) {
await enviar(`Por favor, use ${PREFIXO}login para se registrar e usar meus comandos`);
return}
await cmdBan(isAdmin, isBotAdmin, mencionar, enviar, isOwnerGroup, participant, wxt, from);
break;

case 'teste': {
enviar(resposta.aguarde);
}
break;
        
case "marcar":
if (!login) {
await enviar(`Por favor, use ${PREFIXO}login para se registrar e usar meus comandos`);
return}
await cmdMarcar(isAdmin, isBotAdmin, args, wxt, from, enviar);
break;

case "perfil":
if(!login){
await enviar(`Por favor, user ${PREFIXO}login para se registrar e usar meus comandos`)
 return}
 await cmdPerfil(wxt, participant, nomedele, sendimglink);
break;

case "deletar":
if(!login){
 await enviar(`Por favor, user ${PREFIXO}login para se registrar e usar meus comandos`)
 return}  
if(!isAdmin){
await enviar(resposta.adm)
 return}
if(!isBotAdmin){
await enviar(resposta.botadm)
return}
wxt.sendMessage(from, { delete: { remoteJid: from, fromeMe: false, id: info.message.extendedTextMessage.contextInfo.stanzaId, participant: info.message.extendedTextMessage.contextInfo.participant } })  
break

case "bemvindo":
if(!login){
 await enviar(`Por favor, user ${PREFIXO}login para se registrar e usar meus comandos`)
 return}
if(!isAdmin){
await enviar(resposta.adm)
return}
if(!isBotAdmin){
await enviar(resposta.botadm)
return}
await atividade(info,wxt, bemVindo, "bem-vindo", "data/bemVindo.json");
break


case 'gemini':
const { gemini } = require('./plugins_sistemas/robos');
gemini(q, enviar);
break;

case 'gpt':
const { gpt } = require('./plugins_sistemas/robos');
gpt(q, enviar);
break;

case 'pinterest': { 
const { pinterest } = require('./plugins_sistemas/download.js');
pinterest(wxt, from, texto, PREFIXO, comando, info, enviar)};
break;

case 'yts': {
const { pesquisarYTS } = require('./plugins_sistemas/pesquisa');
pesquisarYTS(wxt, from, texto, PREFIXO, comando, info, enviar, NUMERO_DONO);
}
break;

case 'play': {
const { play } = require('./plugins_sistemas/download.js');
play(wxt, from, texto, PREFIXO, comando, info, enviar)}
break;


case 'playvid': {
const { playvid } = require('./plugins_sistemas/download.js');
playvid(wxt, from, texto, PREFIXO, comando, info, enviar);
}
break;
 
 
// [ FIM DOS COMANDOS COM PREFIXO ]
default:
if (isCmd && comando) {
wxt.sendMessage(from, {text : '[💡] Esse comando não existe tente outro!' }, {quoted:info}) }

} // nao mexer essa colchete ⚠️⚠️
///////////////////////////////////////////////////////
} catch (error) {
console.log("Ocorreu um erro:", error);
}
});
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
fs.unwatchFile(file);
console.log('\x1b[31mATUALIZADO ' + __filename + '\x1b[0m');  
delete require.cache[file];
require(file);
});

// Copyright © 𝑊𝐼𝐿𝑀𝑂 𝐶𝐻𝐴𝑁𝐺 2025