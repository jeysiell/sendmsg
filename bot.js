const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('baileys');
const express = require('express');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

const app = express();
app.use(express.json());

let conn = null; // para reutilizar a conexão fora do startBot

// Iniciar o bot
async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info');

    conn = makeWASocket({
        auth: state,
    });

    conn.ev.on('creds.update', saveCreds);

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
        }
    });
}

// Rota HTTP para envio de mensagens
app.post('/send', async (req, res) => {
    const { telefone, mensagem } = req.body;

    if (!conn || !conn.sendMessage) {
        return res.status(503).json({ error: 'Bot não está conectado ao WhatsApp.' });
    }

    if (!telefone || !mensagem) {
        return res.status(400).json({ error: 'Telefone e mensagem são obrigatórios.' });
    }

    const chatId = `${telefone}@s.whatsapp.net`;

    try {
        await conn.sendMessage(chatId, { text: mensagem });
        console.log(`📨 Mensagem enviada para ${telefone}: ${mensagem}`);
        res.json({ status: 'Mensagem enviada com sucesso' });
    } catch (err) {
        console.error('Erro ao enviar mensagem:', err);
        res.status(500).json({ error: 'Erro ao enviar mensagem' });
    }
});

// Iniciar Express e o bot
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🌐 Servidor do bot escutando na porta ${PORT}`);
    startBot().catch(err => console.error('Erro ao iniciar o bot:', err));
});
