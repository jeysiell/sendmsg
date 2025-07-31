const { isMostrarQrcode, pastaParaSalvarSessao } = require("../config");
const { InputText } = require("../functions");

const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    DisconnectReason
} = require("baileys");

const pino = require('pino');
const CFonts = require('cfonts');

async function Connect() {

    console.clear();
    console.log("\x1b[1;33;42m Iniciando Conexão do M'Dev-Bot \x1b[m")

    const { state, saveCreds } = await useMultiFileAuthState(pastaParaSalvarSessao);

    const { version } = await fetchLatestBaileysVersion();

    const bot = makeWASocket({
        printQRInTerminal: isMostrarQrcode || false,
        version,
        logger: pino({ level: "error" }),
        auth: state,
        browser: ["Ubuntu", "Chrome", "20.0.04"],
        markOnlineOnConnect: true,
    });

    if (!bot.authState.creds.registered && !isMostrarQrcode) {
        const numeroWhatsApp = await InputText("Informe o seu número de WhatsApp \x1b[1;33m(Somente Número)\x1b[m: ");

        if (!numeroWhatsApp) {
            throw new Error("Número de WhatsApp inválido!");
        }

        const code = await bot.requestPairingCode(numeroWhatsApp);

        console.log(`Código de pareamento: ${code}`);
    }

    bot.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === "close") {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

            if (shouldReconnect) {
                Connect();
            }
        }

        
    });

    bot.ev.on("creds.update", saveCreds);


    CFonts.say("M'DEV|BASE", {
        font: 'block',
        align: 'center',
        colors: ['green', 'yellow'],
        background: 'transparent',
        letterSpacing: 1,
        lineHeight: 1,
        space: true,
        maxLength: '0',
        gradient: true
    });

    console.log("\x1b[1;32m O Bot Está Pronto!! \x1b[m")

    return bot;
}

module.exports = {Connect};