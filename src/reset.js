const fs = require('fs').promises;
const path = require('path');

const { pastaParaSalvarSessao } = require('./config')

async function apagarPasta(pasta) {
    try {
        await fs.rm(pasta, { recursive: true, force: true });
        console.log(`Conexão resetada com sucesso: ${pasta}`);
    } catch (err) {
        console.error(`Erro ao apagar a sessão: ${err.message}`);
    }
}

apagarPasta(pastaParaSalvarSessao);
