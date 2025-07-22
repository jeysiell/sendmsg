const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, DisconnectReason } = require("baileys");
const path = require("path");
const pino = require("pino");
const { question, onlyNumbers } = require("./utils");

exports.connect = async () => {
  const { state, saveCreds } = await useMultiFileAuthState(
    path.resolve(__dirname, "..", "assets", "auth", "baileys")
  );
  const { version } = await fetchLatestBaileysVersion();

  const socket = makeWASocket({
    printQRInTerminal: false,
    version,
    logger: pino({ level: "error" }),
    auth: state,
    browser: ["chrome (device)", "", ""],
    markOnlineOnConnect: true,
  });

  if (!socket.authState.creds.registered) {
    const phoneNumber = await question("Informe seu número de telefone: ");
    if (!phoneNumber) {
      throw new Error("Número de telefone inválido.");
    }
    const code = await socket.requestPairingCode(onlyNumbers(phoneNumber));
    console.log(`Código de pareamento: ${code}`);
  }

  socket.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

      if (shouldReconnect) {
        this.connect(); // Corrigido aqui também
      }
    }
  });

  socket.ev.on("creds.update", saveCreds); // salva as credenciais se alterarem
};
