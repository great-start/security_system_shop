FROM node:16.17.1-bullseye-slim

LABEL maintainer="zhenya.bill@gmail.com"

# production option
# ENV NODE_ENV production

WORKDIR /usr/src/server

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

# production option
# RUN npm run build

RUN npm run prisma:generate

EXPOSE 5000

USER node

CMD ["npm", "run", "start:dev"]

# production option
# RUN npm run prisma:prepare

# production option
# CMD ["node", "dist/main"]

