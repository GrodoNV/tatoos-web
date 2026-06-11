# Despliegue en Kubernetes

Este directorio contiene los manifiestos necesarios para desplegar la aplicación "Tatoos Web" en un clúster de Kubernetes.

## Requisitos Previos

1.  Un clúster de Kubernetes funcionando (Minikube, Kind, GKE, EKS, etc.).
2.  `kubectl` configurado para interactuar con tu clúster.
3.  Imágenes de Docker construidas y subidas a un registro accesible por el clúster.

## Pasos para el Despliegue

### 1. Construir y subir las imágenes

Desde la raíz del proyecto:

```bash
# Backend
docker build -t tu-usuario/tatoos-backend:latest -f backend/Dockerfile .
docker push tu-usuario/tatoos-backend:latest

# Frontend
# Nota: Ajusta VITE_API_URL según la dirección de tu Ingress o LoadBalancer
docker build -t tu-usuario/tatoos-frontend:latest --build-arg VITE_API_URL=http://tatoos.local/api -f Dockerfile.frontend .
docker push tu-usuario/tatoos-frontend:latest
```

*Recuerda actualizar los nombres de las imágenes en `backend.yaml` y `frontend.yaml` si usas un nombre diferente.*

### 2. Configurar Secretos

Edita `k8s/config.yaml` y actualiza los valores en el objeto `Secret` con tus credenciales reales (Cloudinary, Gemini API, etc.).

### 3. Aplicar los manifiestos

Puedes aplicar todo el conjunto usando Kustomize:

```bash
kubectl apply -k k8s/
```

O archivo por archivo:

```bash
kubectl apply -f k8s/config.yaml
kubectl apply -f k8s/database.yaml
kubectl apply -f k8s/backend.yaml
kubectl apply -f k8s/frontend.yaml
```

### 4. Acceder a la aplicación

*   **Si usas Minikube:** `minikube service frontend-service`
*   **Si usas Ingress:** Asegúrate de añadir `tatoos.local` a tu archivo `/etc/hosts` apuntando a la IP de tu clúster/Ingress Controller.

## Estructura de Archivos

*   `config.yaml`: ConfigMaps y Secrets (variables de entorno).
*   `database.yaml`: Deployment, Service y PVC para PostgreSQL.
*   `backend.yaml`: Deployment y Service para el backend NestJS.
*   `frontend.yaml`: Deployment, Service e Ingress para el frontend React.
*   `kustomization.yaml`: Configuración para despliegue conjunto.
