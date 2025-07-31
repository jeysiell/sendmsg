const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const { tmpdir } = require('os');

async function imagemParaStickerWebp(buffer) {
  return sharp(buffer)
    .resize(512, 512, {
      fit: 'contain', // mantém proporção, com fundo transparente
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .webp()
    .toBuffer();
}

async function imagemParaStickerWebpEsticada(buffer) {
  return sharp(buffer)
    .resize(512, 512, {
      fit: 'fill' // força esticar para preencher exatamente 512x512
    })
    .webp()
    .toBuffer();
}

async function videoParaStickerWebp(videoBuffer) {
  const inputPath = path.join(tmpdir(), `input-${Date.now()}.mp4`);
  const outputPath = path.join(tmpdir(), `output-${Date.now()}.webp`);

  fs.writeFileSync(inputPath, videoBuffer);

  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions([
        '-vcodec', 'libwebp',
        '-vf', 'scale=320:320:force_original_aspect_ratio=decrease,fps=15',
        '-loop', '0',
        '-ss', '0',
        '-t', '5',
        '-preset', 'default',
        '-an',
        '-vsync', '0'
      ])
      .save(outputPath)
      .on('end', () => {
        const webpBuffer = fs.readFileSync(outputPath);
        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);
        resolve(webpBuffer);
      })
      .on('error', (err) => {
        fs.unlinkSync(inputPath);
        reject(err);
      });
  });
}

module.exports = {
  imagemParaStickerWebp,
  imagemParaStickerWebpEsticada,
  videoParaStickerWebp
};
