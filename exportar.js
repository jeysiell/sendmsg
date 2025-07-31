// Aqui estão as exposições arquivo facil de manusear 

try { 
const fs = require("fs");
const fetch = require('node-fetch');
const yts = require('yt-search')

const { fetchJson, getBuffer } = require('./plugins_sistemas/funcoes/funcoes.js')

const { resposta } = require('./plugins_sistemas/Menus/msgs.js')

const { LerMSG, ReplyMSG }
= require("./plugins_sistemas/LerMSG.js");

const { cmdBan, cmdMarcar, permissao, atividade } 
= require("./plugins_sistemas/cmdAdm.js")

const { cmdLogin, cmdPerfil } 
= require("./plugins_sistemas/cmdLogin.js")

const {contadorMSG } = require("./plugins_sistemas/contadorMSG.js");

const bemVindo = JSON.parse(fs.readFileSync("data/bemVindo.json"));

const { PREFIXO, NOME_BOT, NUMERO_DONO, NOME_DONO, NUMERO_BOT } = require("./config.json")

module.exports = { LerMSG, ReplyMSG, cmdBan, cmdMarcar, permissao, atividade,cmdLogin, cmdPerfil, contadorMSG, bemVindo, PREFIXO, resposta, fetchJson, getBuffer, fetch, yts, NOME_BOT, NUMERO_DONO, NOME_DONO, NUMERO_BOT, }

} catch (wxt) { console.log("Erro na exportação:", wxt)
}

const fs = require("fs");
let file = require.resolve(__filename);
fs.watchFile(file, () => {
fs.unwatchFile(file);
console.log('\x1b[31mATUALIZADO ' + __filename + '\x1b[0m');  
delete require.cache[file];
require(file);
});

// Copyright © 𝑊𝐼𝐿𝑀𝑂 𝐶𝐻𝐴𝑁𝐺 2025