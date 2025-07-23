const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('baileys');
const express = require('express');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

const app = express();
app.use(express.json());

let conn = null; // conexão WhatsApp

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
            const reasonCode = lastDisconnect?.error?.output?.statusCode;
            const shouldReconnect = reasonCode !== DisconnectReason.loggedOut;

            console.log('❌ Conexão fechada. Código:', reasonCode, '| Reconectando?', shouldReconnect);

            if (shouldReconnect) {
                // aguarda 3 segundos antes de tentar reconectar
                setTimeout(() => {
                    console.log('🔄 Tentando reconectar...');
                    startBot().catch(err => console.error('Erro ao reconectar:', err));
                }, 3000);
            } else {
                console.log('🔒 Sessão expirada. Delete a pasta auth_info e escaneie novamente.');
            }
        }

        if (connection === 'open') {
            console.log('✅ Bot conectado!');
        }
    });

    conn.ev.on('connection.set', () => {
        console.log('📡 Conexão com servidor WhatsApp estabelecida.');
    });
}

// Rota HTTP para envio de mensagens
app.post('/send', async (req, res) => {
    const { telefone, mensagem } = req.body;

    if (!conn || typeof conn.sendMessage !== 'function') {
        return res.status(503).json({ error: 'Bot está reconectando. Tente novamente em alguns segundos.' });
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
        console.error('❌ Erro ao enviar mensagem:', err);
        res.status(500).json({ error: 'Erro ao enviar mensagem' });
    }
});

// Iniciar servidor Express e o bot
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🌐 Servidor do bot escutando na porta ${PORT}`);
    startBot().catch(err => console.error('Erro ao iniciar o bot:', err));
});
