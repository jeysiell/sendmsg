let sock; // o socket será definido dinamicamente

function initSocket(socketInstance) {
    sock = socketInstance;
}

async function sendWhatsAppMessage(phoneNumber, message) {
    try {
        if (!sock) throw new Error("Cliente WhatsApp ainda não conectado.");

        if (!phoneNumber.startsWith('55')) {
            phoneNumber = '55' + phoneNumber;
        }

        const jid = `${phoneNumber}@s.whatsapp.net`;

        await sock.sendMessage(jid, { text: message });

        return { success: true };
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        return { success: false, error: error.message };
    }
}

module.exports = { sendWhatsAppMessage, initSocket };
