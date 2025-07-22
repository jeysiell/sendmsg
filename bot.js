// bot.js
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('baileys');
const fs = require('fs');
const qrcode = require('qrcode-terminal'); // Adicione esta dependência


async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info');

    const conn = makeWASocket({
        auth: state,
    });

    conn.ev.on('creds.update', saveCreds);

    // Evento para verificar a conexão e exibir o QR
    conn.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log('📱 Escaneie o QR Code abaixo para conectar:');
            qrcode.generate(qr, { small: true });
        }

        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Conexão fechada. Reconectando?', shouldReconnect);
            if (shouldReconnect) startBot();
        }

        if (connection === 'open') {
            console.log('✅ Bot conectado!');

            const phoneNumber = '5586995590259'; // Substitua pelo número de telefone desejado
            const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // Código de 6 dígitos

            await sendVerificationCode(conn, phoneNumber, verificationCode);
        }
    });
}

// Função para enviar o código de verificação
const sendVerificationCode = async (conn, phoneNumber, code) => {
    const chatId = `${phoneNumber}@s.whatsapp.net`;
    const message = `Seu código de verificação é: ${code}`;

    try {
        await conn.sendMessage(chatId, { text: message });
        console.log(`📨 Código enviado para ${phoneNumber}: ${code}`);
    } catch (error) {
        console.error('❌ Erro ao enviar mensagem:', error);
    }
};

// Iniciar o bot
startBot().catch(err => console.error('Erro ao iniciar o bot:', err));
