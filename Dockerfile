# ---- build stage ----
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Baked into the bundle at build time
ARG VITE_API_BASE
ENV VITE_API_BASE=$VITE_API_BASE

RUN npm run build

# ---- serve stage ----
FROM nginx:alpine

# Official image runs envsubst on files in /etc/nginx/templates,
# so ${PORT} gets filled in at startup (Render sets it)
ENV PORT=80
COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80