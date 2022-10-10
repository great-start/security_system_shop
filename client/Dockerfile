FROM node:16-alpine AS builder
WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
CMD npm run build

FROM nginx:alpine as production
COPY --from=builder /app/build usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD nginx -g daemon off;

