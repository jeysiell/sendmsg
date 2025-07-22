const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require("baileys");
const { connect } = require("http2");
const path = require("path");
const pino = require("pino")

exports.connect = async () => {
  const { state, saveCreds} = await useMultiFileAuthState(
    path.resolve(__dirname, "..", "assets", "auth", "baileys")
  );
  const {version} = await fetchLatestBaileysVersion();

  const socket = makeWASocket( {
    printQRInTerminal: false,
    version,
    logger: pino({level: "error"}),
    auth: state,
    browser: ["chrome (device)", "", ""],
    markOnlineOnConnect: true,
  })

  if (!socket.authState.creds.registered) {
    
  }
};
