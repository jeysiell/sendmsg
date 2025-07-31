// criador.js
const sendCriadorMessage = (from, sender, nomedele, wxt, NOME_BOT, info) => {
const x = `_( Olá ${nomedele} )_\n\n*INFO CRIADOR:*\n Nome: _wilmo chang_\n WhatsApp: _+258840718221_\n País: _Moçambique_`;
wxt.sendMessage(from, {text: `${x}`, contextInfo: {mentionedJid: [sender], externalAdReply: { showAdAttribution: true,  thumbnailUrl: 'https://ibb.co/Jw9V3ncX',  title: "CRIADOR", body: "© wilmochang " + NOME_BOT, previewType: "PHOTO"}}}, {quoted: info});
};

module.exports = sendCriadorMessage;

// Copyright © 𝑊𝐼𝐿𝑀𝑂 𝐶𝐻𝐴𝑁𝐺 2025