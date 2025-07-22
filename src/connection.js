const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require("baileys");
const { connect } = require("http2");
const path = require("path");

exports.connect = async () => {
  const { state, saveCreds} = await useMultiFileAuthState(
    path.resolve(__dirname, "..", "assets", "auth", "baileys")
  );
  const {version} = await fetchLatestBaileysVersion();

  const socket = makeWASocket( {
    printQRInTerminal: false,
  })
};
