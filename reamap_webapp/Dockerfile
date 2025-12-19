FROM node:24-alpine

WORKDIR /app

COPY package-lock.json ./
COPY package.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 8080

CMD ["node", "src/index.js"]