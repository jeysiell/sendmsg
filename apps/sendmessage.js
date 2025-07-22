// whatsapp/sendMessage.js
const client = require('../whatsapp');

async function sendWhatsAppMessage(phoneNumber, message) {
    try {
        if(!phoneNumber.startsWith('55')) {
            phoneNumber = '55' + phoneNumber; // Prefixo do Brasil
        }
        
        const chatId = `${phoneNumber}@c.us`;
        await client.sendMessage(chatId, message);
        return { success: true };
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        return { success: false, error: error.message };
    }
}

module.exports = { sendWhatsAppMessage };
