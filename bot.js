// bot.js
const { WAConnection, MessageType } = require('@adiwajshing/baileys');
const fs = require('fs');

async function startBot() {
    const conn = new WAConnection();

    // Carregar sessão se existir
    if (fs.existsSync('./session.json')) {
        conn.loadAuthInfo('./session.json');
    }

    // Conectar ao WhatsApp
    await conn.connect();

    // Salvar sessão
    fs.writeFileSync('./session.json', JSON.stringify(conn.base64EncodedAuthInfo(), null, '\t'));

    console.log('Bot conectado!');

    // Enviar mensagem
    const sendVerificationCode = async (phoneNumber, code) => {
        const chatId = `${phoneNumber}@c.us`; // Formato do ID do chat
        const message = `Seu código de verificação é: ${code}`;
        
        await conn.sendMessage(chatId, message, MessageType.text);
        console.log(`Código enviado para ${phoneNumber}: ${code}`);
    };

    // Exemplo de uso
    const phoneNumber = '5599999999999'; // Substitua pelo número de telefone desejado
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // Gera um código de 6 dígitos
    await sendVerificationCode(phoneNumber, verificationCode);
}

// Iniciar o bot
startBot().catch(err => console.error('Erro ao iniciar o bot:', err));
