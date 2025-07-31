const resposta = {
erro: "[ ❌ ] Ocorreu um erro ao processar",
dono: "[ ⚠️ ] Comando apenas para donos",
bot: "[ ⚠️ ] Comando apenas para o bot",
botadm: "[ ⚠️ ] O BOT precisa ser ADM",
adm: "[ ⚠️ ] Comando apenas para ADM",
grupo: "[ ⚠️ ] Use o comando em grupos",
aguarde: "[ ⌛ ] Aguarde um instante...",
audio: "[ 🎧 ] Baixando audio aguarde..",
video: "[ 🎥 ] Baixando video aguarde..",
robo: " [ 🤔 ] Analisando o seu texto...",
}

module.exports = { resposta }

const fs = require("fs");
let file = require.resolve(__filename);
fs.watchFile(file, () => {
fs.unwatchFile(file);
console.log('\x1b[31mATUALIZADO ' + __filename + '\x1b[0m');  
delete require.cache[file];
require(file);
});

// Copyright © 𝑊𝐼𝐿𝑀𝑂 𝐶𝐻𝐴𝑁𝐺 2025