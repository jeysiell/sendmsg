// este arquivo contém as const isGroup etc 

const {PREFIXO, NUMERO_BOT } = require("../config.json")
const fs = require("fs")

exports.LerMSG = async(info, wxt) =>{
  
const extendedTextMessage = info?.message?.extendedTextMessage?.text;
const textConversation = info?.message?.conversation;
  
const MSG = extendedTextMessage || textConversation;
   
const keys = info.message ? Object.keys(info.message) : [];

const type = keys.length > 0 
? (keys[0] === 'senderKeyDistributionMessage' 
? (keys[2] || keys[0]) 
: (keys[0] === 'messageContextInfo' 
? (keys[1] || keys[0]) 
: keys[0]))
: 'unknown'; 
const from = info.key.remoteJid

 var body = (type === 'conversation') ? info.message.conversation : (type == 'imageMessage') ? info.message.imageMessage.caption : (type == 'videoMessage') ? info.message.videoMessage.caption : (type == 'extendedTextMessage') ? info.message.extendedTextMessage.text : (type == 'buttonsResponseMessage') ? info.message.buttonsResponseMessage.selectedButtonId : (type == 'listResponseMessage') ? info.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'templateButtonReplyMessage') ? info.message.templateButtonReplyMessage.selectedId : ''  
  
const isCommand = MSG?.startsWith(PREFIXO) ?? false;
  
const comando = isCommand ? MSG.slice(1).trim().split(/ +/).shift().toLowerCase(): "";
  
const args = isCommand ? MSG.split(/ +/).slice(1).join(" "): "";
 
const nomedele = info.pushName ? info.pushName : ''
  
const participant = info?.key?.remoteJid.includes("@g.us") ? info?.key?.participant : info?.key?.remoteJid;
  
const mencionar = info?.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || info?.message?.extendedTextMessage?.contextInfo?.participant;
  
const numerodele = mencionar?.split("@")[0]
  
const isGroup = info.key.remoteJid.endsWith('@g.us')

const sender = isGroup ? info.key.participant : info.key.remoteJid

const groupMetadata = isGroup ? await wxt.groupMetadata(from) : ''

const nomegrupo = isGroup ? groupMetadata.subject : ''

const isCmd = body.startsWith(PREFIXO);
const isBot = info.key.fromMe ? true : false

return{
MSG, from, isCommand, comando, args, nomedele, participant, mencionar, numerodele, sender, nomegrupo, isGroup, body, type, isCmd, isBot,
}
}

exports.ReplyMSG = (wxt, from, info) =>{
  
const sendAudio = async(arquivo) =>{
 await wxt.sendMessage(from,{ audio: fs.readFileSync(arquivo), mimetype: "audio/mp4", ptt: true }, {quoted: info})
  }
  
const sendImagen = async(arquivo, text) =>{
await wxt.sendMessage(from,{ image: fs.readFileSync(arquivo), caption: text },{quoted: info})
}
  
const sendimglink = async(URL, text) =>{
await wxt.sendMessage(from,{ image: {url: URL}, caption: text },{quoted: info})
}
  
const enviar = async (text, mention) =>{
await wxt.sendMessage(from, {text: `${text}` , mentions: mention}, {quoted: info})
}
  
const enviarGifUrl = async (URL, text, mention=[]) =>{
await wxt.sendMessage(from, {video: {url: URL}, caption: text, mentions: mention, gifPlayback: true }, {quoted: info})
}

const reagir = async (emoji) =>{
await wxt.sendMessage(from,{ react:{ text: emoji, key: info.key }})
}
  
return{ reagir, sendAudio, sendImagen, enviar, sendimglink, enviarGifUrl }
}


let file = require.resolve(__filename);
fs.watchFile(file, () => {
fs.unwatchFile(file);
console.log('\x1b[31mATUALIZADO ' + __filename + '\x1b[0m');  
delete require.cache[file];
require(file);
});

// Copyright © 𝑊𝐼𝐿𝑀𝑂 𝐶𝐻𝐴𝑁𝐺 2025