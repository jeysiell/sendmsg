const { prefixo } = require('../config');
const { JID_GROUP_SUFIX, obterJidDono } = require('./verificadores');
const readline = require('readline');

const verificarSeEhComando = (message) => {
    const isCommand = message.trim().startsWith(prefixo);
    return isCommand;
}

const verificarSeEhGrupo = (jid) => {
    return jid.endsWith(JID_GROUP_SUFIX);
}

const verificarSeEhDono = (jid) => {
    const wonerJid = obterJidDono();
    return wonerJid === jid;
}



function InputText(message) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    
    return new Promise((resolve) => rl.question(message, resolve));
};

module.exports = {
    verificarSeEhComando,
    verificarSeEhGrupo,
    verificarSeEhDono,
    InputText,
}