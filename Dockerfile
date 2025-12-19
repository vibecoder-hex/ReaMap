FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

# Сборка (если исходники в репо)
COPY src ./src
COPY tsconfig.json ./
RUN npm install -D typescript @types/node @types/express \
    && npx tsc \
    && npm uninstall -D typescript @types/node @types/express

CMD ["node", "dist/index.js"]