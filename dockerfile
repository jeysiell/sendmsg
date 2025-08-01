FROM node:18

# Instala python3 e pip
RUN apt-get update && apt-get install -y python3 python3-pip

# Instala dependências Python
COPY requirements.txt .
RUN pip3 install -r requirements.txt

# Copia todo o projeto
COPY . .

# Instala dependências Node.js
RUN npm install

# Comando para rodar seu bot
CMD ["npm", "start"]
