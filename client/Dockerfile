FROM node:16-alpine AS Builder

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

CMD npm run build



FROM nginx:alpine as production

