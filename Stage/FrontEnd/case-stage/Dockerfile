# Use uma imagem oficial do Node.js como base
FROM node:16

# Define a pasta '/app' como diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo 'package.json' e 'package-lock.json' (se disponível)
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie os arquivos e pastas do projeto para o diretório atual (por exemplo '/app') no contêiner
COPY . .

# Construa o aplicativo para produção
RUN npm run build

# Use uma imagem oficial do nginx para servir o aplicativo construído
FROM nginx:alpine

# Copie os arquivos construídos do estágio anterior para a pasta de conteúdo do nginx
COPY --from=0 /app/build /usr/share/nginx/html

# Expõe a porta 80 do contêiner para o host
EXPOSE 80

# Inicie o nginx
CMD ["nginx", "-g", "daemon off;"]
