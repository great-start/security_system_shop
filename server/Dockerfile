FROM node:16-alpine

MAINTAINER "Ev"

WORKDIR /usr/src/server

COPY --chown=nest:nest package*.json ./

RUN npm ci

COPY --chown=nest:nest . .

RUN npm run build

CMD [ "npm", "run", "start:prod" ]


