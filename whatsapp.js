// whatsapp/whatsapp.js
const fs = require('fs');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth({
        // Opcional: define uma pasta onde a sessão será salva
        clientId: 'cliente1' // pode usar outro nome se quiser múltiplas sessões
    }),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Escaneie o QR Code para conectar ao WhatsApp');
});

client.on('ready', () => {
    console.log('✅ Client conectado!');
});

client.on('disconnected', (reason) => {
    console.log('⚠️ Cliente desconectado!', reason);
});

client.initialize();

module.exports = client;
