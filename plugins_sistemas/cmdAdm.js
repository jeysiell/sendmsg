/*

** Aqui pode adicionar ou modificar verificação DONO, ADM, BOTADM, ETC
lembrado desde que saiba o que esta fazendo **

*/

const fs = require("fs");

const { ReplyMSG } = require("./LerMSG.js");

const { LerMSG } = require("./LerMSG");

const { NUMERO_BOT } = require("../config.json")

exports.cmdBan = async(isAdmin, isBotAdmin, mencionar, enviar, isOwnerGroup, participant, wxt, from) =>{
  
if(!isAdmin){
enviar("comando usado somente pelos ADM!")
return
}
  
if(!isBotAdmin){
enviar("O número do bot precisa ser ADM!!")
return
}
  
if(!mencionar){
enviar("Marque um usuario ou responda a mensagem dele!")
return
}
  
if(mencionar.includes(NUMERO_BOT)){
enviar("Desculpa mas não posso mi remover")
return
}
  
if(mencionar == participant){
enviar("peça outra pessoa para ti remover")
return
}
  
if(mencionar == isOwnerGroup){
enviar("Fui programado para não remover o criador do grupo!!")
return
}
  
await wxt.groupParticipantsUpdate(
from,
[mencionar],
"remove"
)
  
await enviar("Usuário banido com sucesso deste grupo!")
}


exports.cmdMarcar = async ( isAdmin, isBotAdmin, args, wxt, from,enviar) =>{
  
if(!isAdmin){
enviar("comando usado somente pelos ADM!")
return
}
              
if(!isBotAdmin){
enviar("O número do bot precisa ser ADM!!")
return
}
  
const {participants} = await wxt.groupMetadata(from)
  
if(!args.length){
enviar("Diga por quê ta marcando a todos")
return
}
  
let marcacaoText = `*ATENÇÃO GRUPO:*\n\nINFORMACAO: ${args}\n\n`
  
const marcarMembros = participants?.map(participant => participant.id) || []
  
const marcarMembrosNoId = marcarMembros.map(item => "@" + item.replace(/@s.whatsapp.net/g, ""))
  
marcacaoText += marcarMembrosNoId.join("\n")

enviar(marcacaoText, marcarMembros)  
}


exports.permissao = async (wxt, from, participant,isCommand) => {
  
if(!from.includes("@g.us") || !isCommand) return
  
const { participants = [], owner = null } = await wxt.groupMetadata(from);
    
if (!participants || participants.length === 0) {
return {
isAdmin: false,
isBotAdmin: false,
isOwnerGroup: false
};
}

const admins = participants?.filter(user => user.admin == "admin" || user.admin == "superadmin");
    
const isAdmin = !!admins?.find(admin => admin.id == participant || false)
    
const isBotAdmin = !!admins?.find(admin => admin.id.includes(NUMERO_BOT) || false)
    
const isOwnerGroup = owner === participant 

return {
isAdmin,
isBotAdmin,
isOwnerGroup
};
};


exports.atividade = async (info, wxt, jsonFile,modo, jsonFilePath) =>{
  
const { from, args } = await LerMSG(info);
  
const {enviar} = ReplyMSG(wxt, from, info)
  
const isActive = jsonFile.includes(from)
  
if(args[0] !== "1" && args[0] !== "0") {
await enviar("Digite 1 para ativar e zero para desativar!")
return
}
  
if(args[0] == "1" && isActive){
await enviar(`O modo ${modo} ja esta ativo!`)
return
}
  
if(args[0] == "1" && !isActive){
await enviar(`o modo ${modo} foi ativado`)
jsonFile.push(from)
fs.writeFileSync(jsonFilePath,JSON.stringify(jsonFile))
}
  
if(args[0] == "0" && !isActive){
await enviar(`o modo ${modo} ja esta desativado`)
return
}
  
if(args[0] == "0"){
const groupIndex = jsonFile.indexOf(from);
jsonFile.splice(groupIndex, 1)
    
fs.writeFileSync(jsonFilePath, JSON.stringify(jsonFile))
    
await enviar(`o modo ${modo} foi desativado!`)}
}


let file = require.resolve(__filename);
fs.watchFile(file, () => {
fs.unwatchFile(file);
console.log('\x1b[31mATUALIZADO ' + __filename + '\x1b[0m');  
delete require.cache[file];
require(file);
});

// Copyright © 𝑊𝐼𝐿𝑀𝑂 𝐶𝐻𝐴𝑁𝐺 2025