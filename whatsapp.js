const { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');

const { initSocket } = require('./sendMessage'); // certifique-se do caminho correto

// dentro de startSock()
initSocket(sock); // passa o socket para o módulo de envio


async function startSock() {
    const { state, saveCreds } = await useMultiFileAuthState('baileys_auth');

    const { version } = await fetchLatestBaileysVersion();
    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: true, // Exibe QR no terminal se necessário
        generateHighQualityLinkPreview: true
    });

    // Evento de conexão
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, isNewLogin } = update;

        if (connection === 'close') {
            const shouldReconnect =
                lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

            console.log('📴 Conexão encerrada. Reconectando?', shouldReconnect);

            if (shouldReconnect) {
                startSock();
            } else {
                console.log('🔒 Sessão finalizada. Exclua a pasta "baileys_auth" para novo login.');
            }
        }

        if (connection === 'open') {
            console.log('✅ Conectado ao WhatsApp!');
        }
    });

    // Evento de mensagem recebida
    sock.ev.on('messages.upsert', (msg) => {
        const message = msg.messages[0];
        if (!message.message) return;

        const sender = message.key.remoteJid;
        const text = message.message.conversation || message.message.extendedTextMessage?.text;

        console.log(`📩 Mensagem de ${sender}: ${text}`);

        if (text === '!ping') {
            sock.sendMessage(sender, { text: 'pong 🏓' });
        }
    });

    // Salvar credenciais ao alterar
    sock.ev.on('creds.update', saveCreds);

    return sock;
}

startSock();
