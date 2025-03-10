# Usa uma imagem do Node.js como base
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos necessários para o container
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia todo o código do frontend para dentro do container
COPY . .

# Expõe a porta que o React roda (Vite usa 5173 por padrão)
EXPOSE 5173

# Comando para iniciar o frontend
CMD ["npm", "run", "dev", "--", "--host"]
