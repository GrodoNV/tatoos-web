FROM node:20-bullseye-slim AS builder
WORKDIR /app

# install build dependencies for native modules
RUN apt-get update && apt-get install -y --no-install-recommends python3 build-essential && rm -rf /var/lib/apt/lists/*

# copy package files to install deps (leverages cache)
COPY backend/package*.json ./
RUN npm install --legacy-peer-deps --production=false --no-audit --no-fund

# copy source and build
COPY backend/ .
RUN npm run build

FROM node:20-bullseye-slim
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY backend/package*.json ./
RUN npm install --legacy-peer-deps --production --no-audit --no-fund --omit=dev

ENV PORT=3000
EXPOSE 3000
CMD ["node", "dist/main.js"]
