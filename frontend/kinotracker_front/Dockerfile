# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage (Caddy просто отдаёт статику)
FROM caddy:2.8.0-alpine
COPY --from=build /app/dist /srv/frontend
EXPOSE 80