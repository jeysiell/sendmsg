// commands.js
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const { downloadMediaMessage } = require("baileys");

module.exports = async function handleCommand(
  command,
  args,
  msg,
  mdevbot,
  utils
) {
  const { enviar, enviarImagemViaURL, enviarImagemDePasta } = utils;

  switch (command.toLowerCase()) {
    case "ping":
      await enviar("Pong🏓");
      break;

    case "oi":
      await enviar("Olá");
      break;

    case "foto":
      const img = "./imagens/banner.png";
      const legenda = "Aqui está sua imagem!";
      await enviarImagemDePasta(img, legenda);
      break;

    default:
      await enviar("Comando não reconhecido ❌");
      break;
    case "f": {
      const quoted =
        msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      const quotedImage = quoted?.imageMessage;

      if (!quotedImage) {
        await enviar("❌ Você precisa *responder a uma imagem* com o comando.");
        return;
      }

      try {
        const buffer = await downloadMediaMessage(
          { message: quoted }, // mensagem original com a imagem
          "buffer",
          {},
          {
            reuploadRequest: mdevbot.updateMediaMessage,
          }
        );

        const outputPath = path.join(__dirname, "temp_sticker.webp");
        await sharp(buffer)
          .resize(512, 512, { fit: "fill" }) // estica para 512x512
          .webp()
          .toFile(outputPath);

        await mdevbot.sendMessage(
          msg.key.remoteJid,
          {
            sticker: fs.readFileSync(outputPath),
          },
          { quoted: msg }
        );

        fs.unlinkSync(outputPath);
      } catch (err) {
        console.error(err);
        await enviar("❌ Erro ao criar a figurinha.");
      }

      break;
    }
  }
};
