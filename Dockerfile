# Este Dockerfile en la raíz redirige la construcción a la carpeta backend
FROM node:20-bullseye-slim AS builder
WORKDIR /app

# Instalamos dependencias necesarias para compilar módulos nativos si los hay
RUN apt-get update && apt-get install -y --no-install-recommends python3 build-essential && rm -rf /var/lib/apt/lists/*

# Copiamos los archivos de configuración desde la subcarpeta backend
COPY backend/package*.json ./
RUN npm install --legacy-peer-deps --production=false --no-audit --no-fund

# Copiamos el código del backend y construimos
COPY backend/ .
RUN npm run build

# Etapa de producción
FROM node:20-bullseye-slim
WORKDIR /app

# Copiamos lo necesario de la etapa anterior
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Instalamos solo dependencias de producción
RUN npm install --legacy-peer-deps --production --no-audit --no-fund

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
