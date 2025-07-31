/*
 ** Arquivo de status do bem vindo so tenha cuidado ao modificar**
*/

const fs = require("fs")

exports.status = async(wxt) =>{
  
wxt.ev.on('group-participants.update', async ({id,participants, action})=>{
    
const bemVindo = JSON.parse(fs.readFileSync("data/bemVindo.json"));
    
const isBemVindo = bemVindo.includes(id);
  
try{
if(action == "add" && isBemVindo){
try{
var imgPerfil = await wxt.profilePictureUrl(participants[0], "image");
}catch(error){
console.log(error)

var imgPerfil = "https://telegra.ph/file/b5427ea4b8701bc47e751.jpg"
}
    
const textWelcome = `*_ Temos um novo integrante na familia_*\n*NOME:* @${participants[0].split("@")[0]}\n\n seja bem vindo(a) 🌹🌹`
    
await wxt.sendMessage(id, {
image: { url: imgPerfil },
caption: textWelcome,
mentions: [participants[0]]
})
}
}catch(error){
console.log(error)
}
})
}

let file = require.resolve(__filename);
fs.watchFile(file, () => {
fs.unwatchFile(file);
console.log('\x1b[31mATUALIZADO ' + __filename + '\x1b[0m');  
delete require.cache[file];
require(file);
});

// Copyright © 𝑊𝐼𝐿𝑀𝑂 𝐶𝐻𝐴𝑁𝐺 2025