FROM node:22.12-alpine AS builder

WORKDIR /app
COPY package.json ./
RUN npm install

COPY . .

EXPOSE 3001

# 🔥 Force SSE mode so your HTTP server runs
ENTRYPOINT ["node", "mcpServer.js", "--sse"]
