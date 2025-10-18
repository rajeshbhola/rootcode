---
layout: post
title: Building Scalable Microservices with Docker and Kubernetes
categories: [DevOps, Docker, Kubernetes, Microservices]
tags: [docker, kubernetes, devops, microservices, containers, orchestration]
excerpt: Learn how to containerize applications with Docker and orchestrate them with Kubernetes for production-ready microservices architecture.
---

Microservices architecture has become the de facto standard for building scalable, maintainable applications. Docker and Kubernetes are the foundation of modern microservices deployment.

## Why Microservices?

Monolithic applications have limitations:

- **Scaling**: Must scale entire application, not individual components
- **Deployment**: Single change requires redeploying everything
- **Technology Lock-in**: Entire app must use same tech stack
- **Team Coordination**: Teams step on each other's toes

Microservices solve these problems by breaking applications into small, independent services.

## Docker Basics

Docker containers package your application with all dependencies, ensuring consistency across environments.

### Creating a Dockerfile

Here's a Dockerfile for a Node.js application:

```dockerfile
# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Run as non-root user
USER node

# Start application
CMD ["node", "server.js"]
```

### Multi-Stage Builds

Reduce image size with multi-stage builds:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist

USER node
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

### Docker Compose for Local Development

Orchestrate multiple services locally:

```yaml
version: '3.8'

services:
  # API Service
  api:
    build: ./api
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://db:5432/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    volumes:
      - ./api:/app
      - /app/node_modules

  # Database
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_PASSWORD=secret
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  # Redis Cache
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  # Frontend
  frontend:
    build: ./frontend
    ports:
      - "8080:80"
    depends_on:
      - api

volumes:
  postgres_data:
```

Run with:

```bash
docker-compose up -d
```

## Kubernetes Basics

Kubernetes orchestrates containers at scale, providing:

- **Auto-scaling**: Scale based on load
- **Self-healing**: Restart failed containers
- **Load balancing**: Distribute traffic across instances
- **Rolling updates**: Zero-downtime deployments
- **Secret management**: Secure configuration

### Kubernetes Architecture

Key components:

- **Pod**: Smallest deployable unit (one or more containers)
- **Deployment**: Manages replicas of pods
- **Service**: Exposes pods to network traffic
- **Ingress**: HTTP(S) routing to services
- **ConfigMap**: Configuration data
- **Secret**: Sensitive data (passwords, API keys)

### Deploying to Kubernetes

**1. Create a Deployment:**

```yaml
# api-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
  labels:
    app: api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
      - name: api
        image: myregistry/api:1.0.0
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
        - name: REDIS_URL
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: redis-url
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
```

**2. Create a Service:**

```yaml
# api-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: api-service
spec:
  selector:
    app: api
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: ClusterIP
```

**3. Create an Ingress:**

```yaml
# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/rate-limit: "100"
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - api.example.com
    secretName: api-tls
  rules:
  - host: api.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: api-service
            port:
              number: 80
```

**4. ConfigMap and Secrets:**

```yaml
# configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  redis-url: "redis://redis-service:6379"
  log-level: "info"
```

```yaml
# secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
data:
  url: cG9zdGdyZXNxbDovL3VzZXI6cGFzc0BkYjo1NDMyL215YXBw  # base64 encoded
```

**Apply to cluster:**

```bash
kubectl apply -f api-deployment.yaml
kubectl apply -f api-service.yaml
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml
kubectl apply -f ingress.yaml
```

## Horizontal Pod Autoscaling

Scale automatically based on metrics:

```yaml
# hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api-deployment
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

## CI/CD Pipeline

Automate deployment with GitHub Actions:

```yaml
# .github/workflows/deploy.yml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Build Docker image
        run: |
          docker build -t myregistry/api:${{ github.sha }} .
          docker tag myregistry/api:${{ github.sha }} myregistry/api:latest

      - name: Push to registry
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push myregistry/api:${{ github.sha }}
          docker push myregistry/api:latest

      - name: Deploy to Kubernetes
        uses: azure/k8s-deploy@v1
        with:
          manifests: |
            k8s/deployment.yaml
            k8s/service.yaml
          images: |
            myregistry/api:${{ github.sha }}
          kubeconfig: ${{ secrets.KUBECONFIG }}
```

## Monitoring and Logging

### Prometheus for Metrics

```yaml
# prometheus-config.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
    scrape_configs:
      - job_name: 'kubernetes-pods'
        kubernetes_sd_configs:
          - role: pod
```

### Logging with Fluentd

```yaml
# fluentd-daemonset.yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluentd
spec:
  selector:
    matchLabels:
      app: fluentd
  template:
    metadata:
      labels:
        app: fluentd
    spec:
      containers:
      - name: fluentd
        image: fluent/fluentd-kubernetes-daemonset:v1-debian-elasticsearch
        env:
        - name: FLUENT_ELASTICSEARCH_HOST
          value: "elasticsearch.logging.svc.cluster.local"
        - name: FLUENT_ELASTICSEARCH_PORT
          value: "9200"
```

## Best Practices

1. **Use health checks**: Implement `/health` and `/ready` endpoints
2. **Resource limits**: Always set CPU and memory limits
3. **Secrets management**: Never hardcode secrets in images
4. **Image tags**: Use specific versions, not `latest` in production
5. **Namespace isolation**: Use namespaces for environment separation
6. **Network policies**: Restrict pod-to-pod communication
7. **GitOps**: Store Kubernetes manifests in Git
8. **Monitoring**: Use Prometheus + Grafana for observability

## Conclusion

Docker and Kubernetes provide a robust foundation for microservices. Start small with Docker Compose for local development, then graduate to Kubernetes for production deployments.

The learning curve is steep, but the benefits of scalability, reliability, and developer velocity make it worthwhile.
