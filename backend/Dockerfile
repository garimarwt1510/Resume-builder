# filename: backend/Dockerfile
FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm install --omit=dev

# Copy source
COPY . .

ENV NODE_ENV=production
EXPOSE 5000

# Basic healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:5000/api/health || exit 1

CMD ["node", "server.js"]
