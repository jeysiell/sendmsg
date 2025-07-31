const path = require('path');

const prefixo = ''; 
const nomeDono = 'Jeysiell';
const nomeBot = "Jarvis"; 
const numeroDono = "558694265227"; 

const isMostrarQrcode = true;
const fazerBotResponderSomenteDono = false;

// configuraçã de pastas (só mexa se necessário)
const pastaParaSalvarSessao = path.resolve(__dirname, '..', '..', 'assets', 'qrcode');
const pastaDeImagens = (arquivo) => path.resolve(__dirname, '..', '..', 'assets', 'images', `${arquivo}`);
const pastaTemporaria = path.resolve(__dirname, '..', '..', 'assets','cache');

module.exports = {
     prefixo,
     nomeBot,
     nomeDono,
     isMostrarQrcode,
     numeroDono,
     pastaParaSalvarSessao,
     pastaDeImagens,
     pastaTemporaria,
     fazerBotResponderSomenteDono,
}