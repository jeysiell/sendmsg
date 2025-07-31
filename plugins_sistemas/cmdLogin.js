/* 
** Arquivo Registro ou login responsável pelo sistema da case login ** && pela case perfil **


** ⚠️ cuidado ao modificar sem saber si nenhum comando ira funcionar!! **
*/

const fs = require("fs");

exports.cmdLogin = async (login, enviar, args, from, participant, reagir) => {
const date = new Date();
const loginx = JSON.parse(fs.readFileSync("data/arquivoLogin.json"));

if (login) {
await enviar("Ja tenho os seu registros na minha base de 🎲!");
return;
}

if (!args) {
await enviar("Você deve digitar seu país para se registrar!");
return;
}

// Essa base foi lançada em MZ e BR 
const pais = args.trim().toLowerCase();
const paisValido = ["moçambique", "brasil"];

if (!paisValido.includes(pais)) {
await enviar("Humanos do seu pais não podem usar esse bot aguarde a próxima atualização!.");
return;
}

let objectLogin = {
grupo: from,
user: participant,
info: [
{
pais: pais.charAt(0).toUpperCase() + pais.slice(1), 
totalMensagens: 0,
data: date.toLocaleDateString("pt-br"),
},
],
};

loginx.push(objectLogin);
fs.writeFileSync("data/arquivoLogin.json", JSON.stringify(loginx, null, 3));

await reagir("🎉");
await enviar("*_Registro concluído com Sucesso_*\n**MUITO OBRIGADO** !");
};

// sistema case perfil
exports.cmdPerfil = async (wxt, participant,nomedele, sendImglink) =>{
try{
    
var imgPerfil = await wxt.profilePictureUrl(participant, "image")
    
}catch(error){
console.log(error)
var fotoPerfil = "https://telegra.ph/file/b5427ea4b8701bc47e751.jpg"
}
  
smgPerfil = `*_[ Nome ] :_* ${nomedele}\n\n_Que o ano seja prospero Amém_ 👐`
  
await sendImglink(fotoPerfil, smgPerfil)
}


let file = require.resolve(__filename);
fs.watchFile(file, () => {
fs.unwatchFile(file);
console.log('\x1b[31mATUALIZADO ' + __filename + '\x1b[0m');  
delete require.cache[file];
require(file);
});

// Copyright © 𝑊𝐼𝐿𝑀𝑂 𝐶𝐻𝐴𝑁𝐺 2025