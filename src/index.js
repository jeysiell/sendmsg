const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { downloadMediaMessage } = require("baileys");
const { Connect } = require("./connection");

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

async function MdevStartBot() {
  const mdevbot = await Connect();

  mdevbot.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (msg?.key?.fromMe) return;

    const from = String(msg?.key?.remoteJid);
    const pushName = msg?.pushName || "Desconhecido(a)";
    const message =
      msg?.message?.extendedTextMessage?.text ||
      msg?.message?.conversation ||
      msg?.message?.imageMessage?.caption ||
      msg?.message?.videoMessage?.caption ||
      "";

    const isDono = verificarSeEhDono(from);
    const isGroup = verificarSeEhGrupo(from);
    const isCommand = verificarSeEhComando(message.split(" ")[0].trim());
    const command = isCommand
      ? message.split(" ")[0].replace(prefixo, "").trim()
      : "";
    const args = isCommand
      ? message.replace(`${prefixo}${command}`, "").trim()
      : message;

    if (fazerBotResponderSomenteDono && !isDono) return;
    console.log(`📩 Mensagem de ${pushName} (${from}): ${message}`);

    const messageType = msg?.message ? Object.keys(msg?.message)[0] : "";
    const isImage = messageType === "imageMessage";

    const enviar = async (text) => {
      await mdevbot.sendMessage(from, { text }, { quoted: msg });
    };

    const enviarImagemDePasta = async (rota, legenda = "") => {
      await mdevbot.sendMessage(
        from,
        { image: fs.readFileSync(rota), caption: legenda },
        { quoted: msg }
      );
    };

    // 🎯 COMANDOS
    if (isCommand) {
      switch (command.toLowerCase()) {
        case "ping":
          await enviar("🏓 Pong!");
          break;

        case "menu":
          await enviar(`👋 *Bem-vindo ao menu do bot!*

Escolha uma das opções abaixo digitando o comando correspondente:

🧩 *Como criar figurinha*:
- Digite: /tutorial

📋 *Comandos disponíveis*:
- Digite: /comandos

👨‍💻 *Sobre o bot*:
- Digite: /creditos`);
          break;

        case "tutorial":
          await enviar(`🧩 *Como criar figurinha:*

1. Envie uma imagem.
2. Responda essa imagem com o comando: /f

O bot vai converter a imagem em figurinha.`);
          break;

        case "comandos":
          await enviar(`📋 *Comandos disponíveis:*

- /f → Criar figurinha
- /menu → Mostrar opções do bot
- /ping → Teste de conexão
- /tutorial → Como criar figurinha
- /creditos → Sobre o bot
- /yt → Baixar vídeo do YouTube (ex: /yt https://youtube.com/...)`);
          break;

        case "creditos":
          await enviar(`👨‍💻 *Bot desenvolvido por Jeysiell Lima*
Versão 1.0
Base: Baileys + Node.js`);
          break;

        case "f": {
          const quoted =
            msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
          const quotedImage = quoted?.imageMessage;

          if (!quotedImage) {
            await enviar(
              "❌ Você precisa *responder a uma imagem* com o comando."
            );
            return;
          }

          try {
            const buffer = await downloadMediaMessage(
              { message: quoted },
              "buffer",
              {},
              { reuploadRequest: mdevbot.updateMediaMessage }
            );

            const outputPath = path.join(__dirname, "temp_sticker.webp");
            await sharp(buffer)
              .resize(512, 512, { fit: "fill" })
              .webp()
              .toFile(outputPath);

            await mdevbot.sendMessage(
              msg.key.remoteJid,
              { sticker: fs.readFileSync(outputPath) },
              { quoted: msg }
            );

            fs.unlinkSync(outputPath);
          } catch (err) {
            console.error(err);
            await enviar("❌ Erro ao criar a figurinha.");
          }

          break;
        }

        case "yt": {
          if (!args)
            return enviar(
              "❌ Envie o link do vídeo do YouTube. Ex: `/yt https://youtube.com/...`"
            );

          const { exec } = require("child_process");
          const destino = path.join(__dirname, "assets", "temp");

          if (!fs.existsSync(destino)) fs.mkdirSync(destino, { recursive: true });

          await enviar("⏳ Baixando vídeo... Aguarde.");

          exec(`python yt_download.py "${args}"`, async (err, stdout, stderr) => {
            if (err) {
              console.error(err);
              await enviar("❌ Erro ao baixar o vídeo.");
              return;
            }
          
            const caminho = stdout.trim(); // caminho absoluto do arquivo
            if (!fs.existsSync(caminho)) {
              await enviar("❌ Vídeo não encontrado após o download.");
              return;
            }
          
            await mdevbot.sendMessage(
              from,
              {
                video: fs.readFileSync(caminho),
                caption: "🎬 Aqui está seu vídeo!",
              },
              { quoted: msg }
            );
          
            fs.unlinkSync(caminho); // remove o arquivo temporário
          });
          
          break;
        }
      }
    }
  });
}

MdevStartBot();
