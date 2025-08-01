const { isMostrarQrcode, pastaParaSalvarSessao } = require("../config");
const { InputText } = require("../functions");

const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason,
  makeCacheableSignalKeyStore,
  makeInMemoryStore,
  downloadMediaMessage
} = require("baileys");

const pino = require("pino");
const CFonts = require("cfonts");

async function Connect() {
  console.clear();
  console.log("\x1b[1;33;42m Iniciando Conexão\x1b[m");

  const { state, saveCreds } = await useMultiFileAuthState(pastaParaSalvarSessao);
  const { version } = await fetchLatestBaileysVersion();

  // Se for pareamento, fazer antes de instanciar o socket
  if (!isMostrarQrcode && !state.creds.registered) {
    const numeroWhatsApp = await InputText("Informe o seu número de WhatsApp \x1b[1;33m(Somente Número)\x1b[m: ");
    if (!numeroWhatsApp) throw new Error("Número de WhatsApp inválido!");

    const tempSocket = makeWASocket({
      auth: state,
      version,
      logger: pino({ level: "silent" }), // não imprime nada
      printQRInTerminal: false,
      browser: ["Ubuntu", "Chrome", "20.0.04"],
      markOnlineOnConnect: false,
    });

    try {
      const code = await tempSocket.requestPairingCode(numeroWhatsApp);
      console.log(`\n🔗 Código de pareamento: \x1b[1;32m${code}\x1b[m\n`);
    } catch (err) {
      console.error("❌ Erro ao gerar código de pareamento:", err);
    }
  }

  // Agora cria o socket normalmente
  const bot = makeWASocket({
    printQRInTerminal: isMostrarQrcode,
    version,
    logger: pino({ level: "error" }),
    auth: state,
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    markOnlineOnConnect: true,
  });

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

  CFonts.say("JARVIS", {
    font: "block",
    align: "center",
    colors: ["green", "yellow"],
    background: "transparent",
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: "0",
    gradient: true,
  });

  console.log("\x1b[1;32m Jarvis Online \x1b[m");

  return bot;
}

module.exports = { Connect };
