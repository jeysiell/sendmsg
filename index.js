/*
 ** Muita atenção meu amigo este arquivo contém a conexão do bot isso é serio **
 
 ** apenas modifique a conexão si souber o que esta fazendo votos de uma boa programação** 
 
 */
 
const fs = require("fs");
const path = require("path");
const { 
default: makeWASocket, 
DisconnectReason,
useMultiFileAuthState,
fetchLatestBaileysVersion,
} = require("@whiskeysockets/baileys");
const readline = require("readline");
const pino = require("pino");
const { comandos } = require("./comandos.js");
const { status } = require("./plugins_sistemas/status.js");

// Função para perguntar no terminal
const question = (string) => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(`\x1b[1m${string}\x1b[0m`, (answer) => {
rl.close();
resolve(answer);
}));
};

// Carregar configuração
const configPath = path.resolve(__dirname, "config.json");
if (!fs.existsSync(configPath)) {
console.error("\x1b[1;31m[ERRO] ❌ Arquivo config.json não encontrado!\x1b[0m");
process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

exports.wxtpromo = async () => {
const senhaDigitada = await question("\x1b[1;34m🔐 DIGITE A SENHA PARA INICIAR: \x1b[0m");
if (senhaDigitada !== config.SENHA) {
console.error("\x1b[1;31m🚫 SENHA INCORRETA! ENCERRANDO...\x1b[0m");
process.exit(1);
}
  
console.log("\x1b[1;32m✅ SENHA CORRETA! INICIANDO CONEXÃO...\x1b[0m");

// Estado de autenticação
const { state, saveCreds } = await useMultiFileAuthState(
path.resolve(__dirname, "data", "lixo-qr", "qr-codico"));

const { version } = await fetchLatestBaileysVersion();

const conectar = async () => {
const wxt = makeWASocket({
printQRInTerminal: false,
version,
logger: pino({ level: "silent" }),
auth: state,
browser: ["Ubuntu", "Chrome", "20.0.04"],
markOnlineOnConnect: true,
});

if (!wxt.authState.creds.registered) {
let phoneNumber = await question("\x1b[1;36m📱 INFORME SEU NÚMERO DE TELEFONE: \x1b[0m");
phoneNumber = phoneNumber.replace(/[^0-9]/g, "");

if (!phoneNumber) {
console.error("\x1b[1;31m⚠️ NÚMERO DE TELEFONE INVÁLIDO!\x1b[0m");
process.exit(1);
}

const code = await wxt.requestPairingCode(phoneNumber);
console.log(`\x1b[1;33m🔗 CÓDIGO DE PAREAMENTO: ${code}\x1b[0m`);
}

wxt.ev.on("connection.update", (update) => {
const { connection, lastDisconnect } = update;

if (connection === "close") {
const shouldReconnect =
lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
        
console.log("\x1b[1;31m🔴 CONEXÃO PERDIDA! TENTANDO RECONEXÃO...\x1b[0m");
        
if (shouldReconnect) {
setTimeout(() => {
console.log("\x1b[1;33m🔄 REINICIANDO CONEXÃO...\x1b[0m");
conectar();
}, 5000); // Aguarda 5 segundos antes de tentar reconectar
}
} else if (connection === "open") {
console.log("\x1b[1;32m🟢 CONECTADO COM SUCESSO!\x1b[0m");
}});

wxt.ev.on("creds.update", saveCreds);
comandos(wxt);
status(wxt);
return wxt;
};
await conectar();
};
this.wxtpromo();


let file = require.resolve(__filename);
fs.watchFile(file, () => {
fs.unwatchFile(file);
console.log('\x1b[31mATUALIZADO ' + __filename + '\x1b[0m');  
delete require.cache[file];
require(file);
});

// Copyright © 𝑊𝐼𝐿𝑀𝑂 𝐶𝐻𝐴𝑁𝐺 2025