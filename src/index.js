const fs = require("fs");
const { Connect } = require("./connection");
const { downloadMediaMessage } = require("baileys");
const {
  imagemParaStickerWebp,
  imagemParaStickerWebpEsticada, // import novo
  videoParaStickerWebp,
} = require("./config/sticker");

const {
  fazerBotResponderSomenteDono,
  prefixo,
  pastaDeImagens,
  nomeBot,
  nomeDono,
} = require("./config");

const {
  verificarSeEhDono,
  verificarSeEhGrupo,
  verificarSeEhComando,
} = require("./functions");
const { env } = require("process");

async function MdevStartBot() {
  const mdevbot = await Connect();

  mdevbot.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (msg?.key?.fromMe) return; // o bot não responde a si mesmo.

    const key = msg?.key;
    const from = String(msg?.key?.remoteJid);
    const pushName = msg?.pushName || "Desconhecido(a)";
    const message =
      msg?.message?.extendedTextMessage?.text ||
      msg?.message?.conversation ||
      msg?.message?.imageMessage?.caption ||
      msg?.message?.videoMessage?.caption ||
      "";

    // variáveis de verificação
    const isDono = verificarSeEhDono(from);
    const isGroup = verificarSeEhGrupo(from);
    const participantJId = isGroup ? msg?.key?.participant : undefined;

    const isCommand = verificarSeEhComando(message.split(" ")[0].trim());
    const command = isCommand
      ? message.split(" ")[0].replace(prefixo, "").trim()
      : "";
    const args = isCommand
      ? message.replace(`${prefixo}${command}`, "").trim()
      : message;

    if (fazerBotResponderSomenteDono && !isDono) return;

    const messageType = msg?.message ? Object.keys(msg?.message)[0] : "";

    const idMessage = String(msg?.key?.id);
    const isImage = messageType === "imageMessage";
    const isVideo = messageType === "videoMessage";
    const isSticker = messageType === "stickerMessage";

    const enviar = async (text) => {
      await mdevbot.sendMessage(from, { text }, { quoted: msg });
    };

    const enviarImagemViaURL = async (url, legenda = "") => {
      await mdevbot.sendMessage(
        from,
        { image: { url }, caption: legenda },
        { quoted: msg }
      );
    };

    const enviarImagemDePasta = async (rotaDoArquivo, legenda = "") => {
      await mdevbot.sendMessage(
        from,
        { image: fs.readFileSync(rotaDoArquivo), caption: legenda },
        { quoted: msg }
      );
    };

    // comandos
    if (isCommand) {
      switch (command.toLowerCase()) {
        case "ping":
          enviar("Pong🏓");
          break;
        case "oi":
          let legenda = `*Olá*`;
          enviar(legenda);
          break;

        case "sticker":
          if (isImage || isVideo) {
            try {
              const buffer = await downloadMediaMessage(
                msg,
                "buffer",
                {},
                mdevbot
              );

              let webpSticker;
              if (isImage) {
                webpSticker = await imagemParaStickerWebp(buffer);
              } else if (isVideo) {
                if (msg.message.videoMessage.seconds > 6) {
                  return enviar("Vídeo deve ter no máximo 6 segundos.");
                }
                webpSticker = await videoParaStickerWebp(buffer);
              }

              await mdevbot.sendMessage(
                from,
                {
                  sticker: webpSticker,
                },
                { quoted: msg }
              );
            } catch (err) {
              console.error("Erro ao criar figurinha:", err);
              enviar("Erro ao criar figurinha.");
            }
          } else {
            enviar("Envie uma imagem ou vídeo curto com legenda *!sticker*");
          }
          break;
        case "fig": // comando para figurinha esticada
          if (isImage || isVideo) {
            try {
              const buffer = await downloadMediaMessage(
                msg,
                "buffer",
                {},
                mdevbot
              );
              let webpSticker;

              if (isImage) {
                webpSticker = await imagemParaStickerWebpEsticada(buffer);
              } else if (isVideo) {
                if (msg.message.videoMessage.seconds > 6) {
                  return enviar("Vídeo deve ter no máximo 6 segundos.");
                }
                webpSticker = await videoParaStickerWebp(buffer);
              }

              await mdevbot.sendMessage(
                from,
                {
                  sticker: webpSticker,
                },
                { quoted: msg }
              );
            } catch (err) {
              console.error("Erro ao criar figurinha:", err);
              enviar("Erro ao criar figurinha.");
            }
          } else {
            enviar("Envie uma imagem ou vídeo curto com legenda *!fig*");
          }
          break;

        default:
          enviar(
            "Comando inválido! Acesse meu menu de comandos\n\n> " +
              prefixo +
              "menu"
          );
      }
    }
  });
}

MdevStartBot();
