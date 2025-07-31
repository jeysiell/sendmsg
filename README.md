<p align="center">
  <img src="assets/images/banner.png" height=250 alt="M'Dev Bot Banner" />
</p>

# 🤖 M'Dev Bot JS – Base Simples para WhatsApp

Bem-vindo à base oficial do **M'Dev Bot JS**, um projeto desenvolvido para facilitar a criação de bots no WhatsApp com JavaScript.
Ideal para desenvolvedores que desejam começar rápido com uma estrutura organizada, funcional e pronta para expandir.

---

## 🚀 Recursos Principais

- ✅ Estrutura modular e de fácil manutenção
- 💬 Envio e resposta de mensagens automáticas
- 📂 Suporte a comandos personalizados
- 🔒 Gerenciamento de sessões QR Code
- 📦 Pronto para deploy em ambientes como VPS ou localmente

---

Instalar dependências
````bash
npm install
````

Para resetar a conexão do bot, use:

```bash
npm run reset
```

Para inicar o script do bot ou estabelecer nova conexão, use:
```bash
npm run start # para nova conexão
```

## Comandos no Termux
Se você está usando o termux, no celular android, use os comandos abaixo.
**OBS: Esse comandos são de instalação de pacotesm se você já fez isso alguma vez, não necessariamente necessário.

Dê permissão no Termux para acessar seus armazenamentos
```bash
termux-setup-storage
```
Atualize os pacotes do dispositivo
```bash
apt update -y
```
```bash
apt upgrade -y
```
Instale o ffmpeg para trabalhar com manipulação de mídia sem problemas
```bash
apt install ffmpeg -y
```
Instale o python3 (alguns códigos executarão o python, apesar do bot está em nodejs)
```bash
apt install python3 -y
```
Instale o git para baixar a base do bot
```bash
apt install git -y
```
Instale o nodejs
```bash
apt install nodejs && apt install nodejs-tsc
```

Para verificar se o tudo instalou corretamente use o comando
```bash
npm --version
```
```bash
node --version
```
```bash
git --version
```
```bash
ffmpeg -version
```
```bash
python --version
```
```bash
pip --version
```
Se todos os comandos mostarem algo como versão do pacote, então tudo certo.
### Baixando a Base do bot
Para baixar a base do bot use:
```bash
cd /sdcard # para entrar no armazenamento do dispositivo
```
Clone o repositório:
```bash
git clone https://github.com/Kamado8421/base-mdev-md.git
```

## Para executar no termux 
```bash
cd /sdcard/base-mdev-md # Entre na pasta
```
Executar o código:
```bash
npm start
```

## 📁 Estrutura do Projeto

- `assets/imagens` coloque aqui as imagens fixas do seu bot, como banners...
- `asssets/qrcode` aqui fica salvo a sessão do script com o whatsApp.
- `assets/cache` aqui fica salvo arquivos temporários que o script pode gerenciar e apagar automaticamente

Em `src/config/index.js` você deve ter a estrutura:

```javascript
const path = require('path');

const prefixo = '/'; // prefixo do bot
const nomeDono = 'MDev Systems'; // seu nome
const nomeBot = "M'Dev BOT"; // nome do bot
const numeroDono = "559900000000"; // numero do dono 55+DDD+NUMERO SEM O 9

const isMostrarQrcode = true; // se for true, ele vai mostrar o qrcode para conexão
const fazerBotResponderSomenteDono = false; // se for true, é ideal pra quando o bot tá em testes, só vai tesponder mensagens do dono.

// configuraçã de pastas (só mexa se necessário)
const pastaParaSalvarSessao = path.resolve(__dirname, '..', '..', 'assets', 'qrcode');
const pastaDeImagens = (arquivo) => path.resolve(__dirname, '..', '..', 'assets', 'images', `${arquivo}`);
const pastaTemporaria = path.resolve(__dirname, '..', '..', 'assets','cache');

module.exports = {
     prefixo,
     nomeBot,
     nomeDono,
     isMostrarQrcode,
     numeroDono,
     pastaParaSalvarSessao,
     pastaDeImagens,
     pastaTemporaria,
     fazerBotResponderSomenteDono,
}
```

**Obs:** sem as informações de `numeroDono` você não será identificado pelo bot como dono.

## Funções na `src/index.js`

```javascript
// envie mensagens de textos comum
const enviar = async (text) => {
  await mdevbot.sendMessage(from, { text }, { quoted: msg });
}

// use:
enviar('sua msg')

// envia imagens com ou sem legendas a partir de links de imagens online
const enviarImagemViaURL = async (url, legenda = '') => {
  await mdevbot.sendMessage(from, { image: { url }, caption: legenda }, { quoted: msg });
}

// use:
const url = 'link da sua imagem';
enviarImagemViaURL(url) // sem legenda
enviarImagemViaURL(url, "sua legenda") // com legenda

// envia imagens com ou sem legendas que estão armazenas em alguma pasta (images, cache ou outras)
const enviarImagemDePasta = async (rotaDoAquirvo, legenda = '') => {
  await mdevbot.sendMessage(from, { image: fs.readFileSync(rotaDoAquirvo), caption: legenda }, { quoted: msg });
}

// use: 
const rotaDoarquivo = '../assstes/imagens/banner.png' // caminho do arquivo
enviarImagemDePasta(rotaDoarquivo)
```
