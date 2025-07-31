// Arquivo de download do bot 
// Copyright © 𝑊𝐼𝐿𝑀𝑂 𝐶𝐻𝐴𝑁𝐺 2025

const { fetchJson, getBuffer}  = require('./funcoes/funcoes.js'); 
const { resposta } = require('./Menus/msgs.js');
const yts = require('yt-search'); 
 
async function pinterest(wxt, from, texto, PREFIXO, comando, info, enviar) {
if (!texto) return enviar ('O nome da imagem do Pinterest!!')
try {
enviar(resposta.aguarde)
const pin = await fetchJson(`https://bk9.fun/pinterest/search?q=${texto}`)
await wxt.sendMessage(from, { image: { url: pin.BK9[4].images_url }, quoted: info });
} catch (wxt) { console.log(wxt)
enviar(resposta.erro);
}};

async function play(wxt, from, texto, PREFIXO, comando, info, enviar) {
if (!texto) return enviar(`O nome da musica exemplo: ${PREFIXO + comando} Mc tuto 2025`);
enviar(resposta.audio)    

try {
let pesquisa = yts(texto);
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

const ytaudio = await fetchJson(`https://bk9.fun/download/youtube2?url=${resultadoAleatorio.url}`);

if (ytaudio.BK9 && ytaudio.BK9.length > 0) {
await wxt.sendMessage(from, { 
audio: { url: `${ytaudio.BK9[0].mediaLink}` }, 
mimetype: "audio/mp4" }, { quoted: info });
} else {
enviar('não foi possível obter o link');
}
} catch (err) {
enviar(resposta.erro);
}
}

async function playvid(wxt, from, texto, PREFIXO, comando, info, enviar) {
if (!texto) return enviar(`O nome do video exemplo: ${PREFIXO + comando} Mc tuto 2025`);
enviar(resposta.video)
    
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

const ytvideo = await fetchJson(`https://bk9.fun/download/youtube2?url=${resultadoAleatorio.url}`);

if (ytvideo.BK9 && ytvideo.BK9.length > 0) {
await wxt.sendMessage(from, { 
video: { url: `${ytvideo.BK9[0].mediaLink}` }, 
mimetype: "video/mp4" }, { quoted: info });
} else {
enviar('nao foi possível obter o link.');
}
} catch (err) {
enviar(respota.erro);
}
}

module.exports = { play, playvid, pinterest };

// Copyright © 𝑊𝐼𝐿𝑀𝑂 𝐶𝐻𝐴𝑁𝐺 2025