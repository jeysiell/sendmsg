// commands.js

module.exports = async function handleCommand(command, args, msg, mdevbot, utils) {
    const { enviar, enviarImagemViaURL, enviarImagemDePasta } = utils;

    switch (command.toLowerCase()) {
        case 'ping':
            await enviar('Pong🏓');
            break;

        case 'oi':
            await enviar('Olá');
            break;

        case 'foto':
            const img = './imagens/banner.png';
            const legenda = 'Aqui está sua imagem!';
            await enviarImagemDePasta(img, legenda);
            break;

        default:
            await enviar('Comando não reconhecido ❌');
            break;
    }
};
