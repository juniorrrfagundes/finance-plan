# Usar uma imagem base do Node.js com Alpine para uma versão mais leve
FROM node:18-alpine

# Criar e definir o diretório de trabalho no container
WORKDIR /usr/src/app

# Copiar o arquivo package.json e package-lock.json (se houver) para o container
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar todos os arquivos do projeto para dentro do container
COPY . .

# Compilar o código TypeScript
RUN npx tsc

# Comando para rodar o script TypeScript com ts-node - CMD ["npx", "ts-node", "src/index.ts"]
CMD ["npm", "run", "dev"]
