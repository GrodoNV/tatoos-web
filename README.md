# Villanos Tattoo — Docker & Local Run

Este repositorio contiene la aplicación frontend (Vite + React) en la raíz y el backend (NestJS) en la carpeta `backend/`.

## Archivos añadidos para Docker

- `Dockerfile.frontend` — construye el frontend y lo sirve con `nginx`.
- `backend/Dockerfile` — construye y ejecuta el backend NestJS.
- `nginx.conf` — configuración para servir la SPA y proxear `/api` al backend dentro de la red de Compose.
- `docker-compose.yml` — orquesta `frontend` + `backend` para desarrollo local.

## Variables de entorno necesarias

Antes de levantar los servicios copia el ejemplo a un archivo `.env`:

```bash
cp .env.example .env
```

Y edita los valores internos según tu base de datos y tu clave JWT:

```ini
DATABASE_URL=postgres://user:pass@localhost:5432/tattoos
JWT_SECRET=cambiame
```

Si usas una base de datos local, ajusta `DATABASE_URL` en consecuencia.

> Nota: no incluyas `.env` en Git si contiene datos reales. Usa `.env.example` como plantilla.

## Construir y ejecutar (Docker Compose)

Desde la raíz del proyecto ejecuta la versión que funcione en tu máquina.

Si tienes `docker-compose` clásico:

```bash
docker-compose up --build -d
```

Si tienes el plugin moderno y el comando `docker compose` disponible:

```bash
docker compose build
docker compose up -d
```

Si no tienes el plugin moderno y quieres instalarlo:

```bash
sudo apt-get update
sudo apt-get install docker-compose-plugin
```

Si obtienes `permission denied while trying to connect to the Docker daemon socket`, agrega tu usuario al grupo `docker` y vuelve a iniciar sesión:

```bash
sudo usermod -aG docker $USER
```

Si no puedes instalar Compose, puedes levantar los contenedores manualmente:

```bash
docker build -f backend/Dockerfile -t tattoos-backend .
docker build -f Dockerfile.frontend -t tattoos-frontend .

docker network create tattoos-net

docker run -d --name backend --network tattoos-net -p 3000:3000 \
  -e DATABASE_URL='postgres://user:pass@db:5432/tattoos' \
  -e JWT_SECRET='cambiame' tattoos-backend

docker run -d --name frontend --network tattoos-net -p 4173:80 tattoos-frontend
```

Comprobar logs:

```bash
docker compose logs -f frontend
docker compose logs -f backend
```

Parar y limpiar:

```bash
docker compose down
```

## Notas útiles

- El frontend toma la URL de la API desde la variable de entorno `VITE_API_URL` en tiempo de build. En `docker-compose.yml` lo configuramos a `http://backend:3000/api` para que el contenedor `frontend` resuelva `backend` en la red de compose.
- Si prefieres exponer el frontend en `:80`, ajusta el mapeo de puertos en `docker-compose.yml`.
- Asegúrate de que la base de datos sea accesible desde el contenedor backend; para producción considera usar secretos de Kubernetes o un gestor de secretos.

Si quieres, puedo también generar los manifiestos de Kubernetes después de verificar que los contenedores levanten correctamente.
# tatoos-web
Una web que pueda recuperar informacion para que el administrador de un local de tatuajes pueda recibir pedidos y/o hacer contacto con clientes

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
