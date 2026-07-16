# filename: frontend/Dockerfile
# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

# Vite inlines VITE_* env vars at build time, so it must be passed as a
# build ARG (not a runtime `environment:` entry in docker-compose).
ARG VITE_API_BASE_URL=/api
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ---- Serve stage (lightweight static server) ----
FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
EXPOSE 4173
CMD ["serve", "-s", "dist", "-l", "4173"]
