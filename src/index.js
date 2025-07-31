const fs = require('fs');
const { Connect } = require("./connection");

const {
    fazerBotResponderSomenteDono,
    prefixo, pastaDeImagens,
    nomeBot,
    nomeDono
} = require("./config");

const { verificarSeEhDono,
    verificarSeEhGrupo,
    verificarSeEhComando
} = require("./functions");
const { env } = require('process');

async function MdevStartBot() {
    const mdevbot = await Connect();

    mdevbot.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (msg?.key?.fromMe) return; // o bot não responde a si mesmo.

        const key = msg?.key;
        const from = String(msg?.key?.remoteJid);
        const pushName = msg?.pushName || 'Desconhecido(a)';
        const message = msg?.message?.extendedTextMessage?.text || msg?.message?.conversation || msg?.message?.imageMessage?.caption || msg?.message?.videoMessage?.caption || '';

        // variáveis de verificação
        const isDono = verificarSeEhDono(from);
        const isGroup = verificarSeEhGrupo(from);
        const participantJId = isGroup ? msg?.key?.participant : undefined;

        const isCommand = verificarSeEhComando(message.split(' ')[0].trim());
        const command = isCommand ? message.split(' ')[0].replace(prefixo, '').trim() : '';
        const args = isCommand ? message.replace(`${prefixo}${command}`, '').trim() : message;

        if (fazerBotResponderSomenteDono && !isWoner) return;

        const messageType = msg?.message ? Object.keys(msg?.message)[0] : '';

        const idMessage = String(msg?.key?.id);
        const isImage = messageType === 'imageMessage';
        const isVideo = messageType === 'videoMessage';
        const isSticker = messageType === 'stickerMessage';

        const enviar = async (text) => {
            await mdevbot.sendMessage(from, { text }, { quoted: msg });
        }

        const enviarImagemViaURL = async (url, legenda = '') => {
            await mdevbot.sendMessage(from, { image: { url }, caption: legenda }, { quoted: msg });
        }

        const enviarImagemDePasta = async (rotaDoAquirvo, legenda = '') => {
            await mdevbot.sendMessage(from, { image: fs.readFileSync(rotaDoAquirvo), caption: legenda }, { quoted: msg });
        }

        // comandos
        if (isCommand) {
            switch (command.toLowerCase()) {
                case 'ping':
                    enviar('Pong🏓');
                    break
                case 'oi':
                    let legenda = `*Olá*`;
                    enviar(legenda);
                    break
                default:
                    enviar('Comando inválido! Acesse meu menu de comandos\n\n> ' + prefixo + 'menu')
                    case 'ola':
                        enviar(`*Olá*`)
            }
        }
    })
}

MdevStartBot();

