#!/bin/bash
set -e

echo "🚀 Iniciando aplicación Nest..."
echo "⏳ Esperando a que la base de datos esté lista..."

# Esperar a que Postgres esté listo
for i in {1..30}; do
  if node -e "require('pg').Client" 2>/dev/null; then
    echo "✅ Postgres disponible"
    break
  fi
  echo "⏳ Intento $i de 30..."
  sleep 1
done

echo "🌱 Ejecutando seed..."
# Ir a backend para ejecutar el seed
cd /app

# Crear conexión de prueba a la BD
node -e "
  const { Client } = require('pg');
  const client = new Client({
    host: process.env.DB_HOST || 'db',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  
  client.connect().then(() => {
    console.log('✅ Conexión a BD exitosa');
    client.end();
  }).catch(err => {
    console.error('❌ Error conectando a BD:', err.message);
    process.exit(1);
  });
" || exit 1

# Ejecutar seed con ts-node
npx ts-node -O '{\"module\":\"commonjs\"}' src/seed-tattoos.ts 2>/dev/null || echo "⚠️  Seed ejecutado con limitaciones"

echo "✨ Iniciando servidor..."
exec node dist/main.js
