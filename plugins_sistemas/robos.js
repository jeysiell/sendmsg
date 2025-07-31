// Arquivo de inteligência artificial 
// Copyright © 𝑊𝐼𝐿𝑀𝑂 𝐶𝐻𝐴𝑁𝐺 2025

const { fetchJson, getBuffer}  = require('./funcoes/funcoes.js'); 
const fetch = require('node-fetch');
const { resposta } = require('./Menus/msgs.js');

async function gemini(q, enviar) {
if (!q) return enviar('Sou o Gemini, faça uma questão.');
enviar(resposta.robo)
try {
const gemini = await fetch(`https://bk9.fun/ai/gemini?q=${q}`).then(res => res.json());
enviar(gemini.BK9);
} catch (erro) {
console.error('Gemini deu erro:', erro);
enviar(resposta.erro);
}
}

async function gpt(q, enviar) {
if (!q) return enviar('Sou o ChatGPT, faça uma questão.');
enviar(resposta.robo)
try {
const gpt = await fetch(`https://bk9.fun/ai/chataibot?q=${q}`).then(res => res.json());
enviar(gpt.BK9);
} catch (erro) {
console.error('ChatGPT:', erro);
enviar(resposta.erro);
}
}

module.exports = { gemini, gpt };

// Copyright © 𝑊𝐼𝐿𝑀𝑂 𝐶𝐻𝐴𝑁𝐺 2025



