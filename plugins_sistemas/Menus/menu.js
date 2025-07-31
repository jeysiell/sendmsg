const { PREFIXO, NOME_BOT } = require('../../config.json');

const enviarMenu = async (wxt, from, login, nomedele, PREFIXO, NOME_BOT, cmdMaisUsado, info, enviar) => {
if (!login) {
return enviar(`Por favor, use ${PREFIXO}login para se registrar e usar meus comandos`);
}

const comandosUsados = await cmdMaisUsado(PREFIXO, login); 

const menu = `
  〠 *USUARIO:* ${nomedele}
   
➠ Comandos mais usados :
${comandosUsados}
      
  〠 *PREFIXO:* ${PREFIXO}
  〠 *NOME BOT:* ${NOME_BOT}
  
  *_[ COMANDOS PARA ADM ]_*
  
  〠 *${PREFIXO}* Ban _(marcar msg)_
  〠 *${PREFIXO}* Marcar _(marcar msg)_
  〠 *${PREFIXO}* Deletar _(marcar msg)_
  
  *_[ COMANDOS PUBLICOS ]_*
  
  〠 *${PREFIXO}* yts _(nome do vídeo)_
  〠 *${PREFIXO}* gpt _(faça pergunta)_
  〠 *${PREFIXO}* play _(nome da música)_
  〠 *${PREFIXO}* gemini _(faça pergunta)_
  〠 *${PREFIXO}* playvid _(nome do vídeo)_
  〠 *${PREFIXO}* pinterest _(nome da img)_
  
  *_[ COMANDOS CASUAIS ]_*    
  
  〠 *${PREFIXO}* dono
  〠 *${PREFIXO}* perfil
  〠 *${PREFIXO}* criador
  〠 *${PREFIXO}* gitbot 

Copyright © 𝑊𝐼𝐿𝑀𝑂 𝐶𝐻𝐴𝑁𝐺 2025
  `;

await wxt.sendMessage(from, { text: menu }, {quoted:info});
};

module.exports = enviarMenu;