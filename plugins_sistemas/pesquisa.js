// Arquivo de pesqisas do bot 
// Copyright © 𝑊𝐼𝐿𝑀𝑂 𝐶𝐻𝐴𝑁𝐺 2025

const { fetchJson, getBuffer}  = require('./funcoes/funcoes.js'); 
const { resposta } = require('./Menus/msgs.js');
const yts = require('yt-search'); 

async function pesquisarYTS(wxt, from, texto, PREFIXO, comando, info, enviar, NUMERO_DONO) {
if (!texto) return enviar(`O nome da musica exemplo: ${PREFIXO + comando} Mc tuto 2025`);
enviar(resposta.aguarde)
try {
let pesquisa = await yts(texto);
let resultadoAleatorio = pesquisa.videos[Math.floor(Math.random() * pesquisa.videos.length)];
let imagem = await getBuffer(resultadoAleatorio.thumbnail);

let mensagem = `
[🗒️] *Título:* ${resultadoAleatorio.title}
[🔢] *ID:* ${resultadoAleatorio.videoId}
[👁️] *Visualizações:* ${resultadoAleatorio.views}
[📤] *Upload:* ${resultadoAleatorio.ago}
[👤] *Autor:* ${resultadoAleatorio.author.name}
[📺] *Canal:* ${resultadoAleatorio.author.url}
[🔗] *Link:* ${resultadoAleatorio.url}
`;

await wxt.sendMessage(from, { image: imagem, caption: mensagem }, { quoted: info });
} catch (err) {
enviar(resposta.erro);
}
}

module.exports = { pesquisarYTS };

// Copyright © 𝑊𝐼𝐿𝑀𝑂 𝐶𝐻𝐴𝑁𝐺 2025