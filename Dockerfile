FROM node:22.12-alpine AS builder

WORKDIR /app

# ⬇️ Only copy package.json (since package-lock.json doesn't exist)
COPY package.json ./
RUN npm install

COPY . .

ENTRYPOINT ["node", "mcpServer.js"]

EXPOSE 3001
