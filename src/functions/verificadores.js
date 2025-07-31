const { numeroDono } = require("../config");

const JID_USER_SUFIX = '@s.whatsapp.net';
const JID_GROUP_SUFIX = '@g.us';

const gerarJidDeUsuario = (phone_number) => {
    return `${phone_number}${JID_USER_SUFIX}`
}

const obterJidDono = () => {
    return `${gerarJidDeUsuario(numeroDono)}`;
}

module.exports = {
    gerarJidDeUsuario,
    obterJidDono,
    JID_GROUP_SUFIX,
    JID_USER_SUFIX
}
