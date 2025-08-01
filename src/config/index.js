const path = require('path');

const prefixo = ''; // prefixo do bot
const nomeDono = 'Jeysiell'; // seu nome
const nomeBot = "JARVIS"; // nome do bot
const numeroDono = "558694265227"; // numero do dono 55+DDD+NUMERO SEM O 9

const isMostrarQrcode = true; // se for true, ele vai mostrar o qrcode para conexão
const fazerBotResponderSomenteDono = false; // se for true, é ideal pra quando o bot tá em testes, só vai tesponder mensagens do dono.

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