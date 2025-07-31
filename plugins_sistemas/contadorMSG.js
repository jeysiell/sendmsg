/*

** essa função é responsável por contar as mensagens e comandos de cada usuário do bot e armazenar no arquivo (arquivoLogin.json) ** Assim pode pegar as informações dos usuários quando vc quiser!!

*/

const fs = require("fs")
  
exports.contadorMSG = async(info, from, participant) =>{
  
const arquivoLogin = JSON.parse(fs.readFileSync("data/arquivoLogin.json"))
  
const login = arquivoLogin?.find((grupos) => grupos.grupo == from && grupos.user == participant)
  
if(login && info){
    
const totalMensagens = login.info[0].totalMensagens;
const novoTotal = totalMensagens+1;
    
login.info[0].totalMensagens = novoTotal
    
fs.writeFileSync("data/arquivoLogin.json", JSON.stringify(arquivoLogin, null, 3))
}
return login
}

let file = require.resolve(__filename);
fs.watchFile(file, () => {
fs.unwatchFile(file);
console.log('\x1b[31mATUALIZADO ' + __filename + '\x1b[0m');  
delete require.cache[file];
require(file);
});

// Copyright © 𝑊𝐼𝐿𝑀𝑂 𝐶𝐻𝐴𝑁𝐺 2025