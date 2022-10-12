FROM node:16.17.1-slim

LABEL maintainer="zhenya.bill@gmail.com"

# production option
# ENV NODE_ENV production

WORKDIR /usr/src/server

COPY --chown=nest:nest package*.json ./

RUN npm ci --only=production

COPY --chown=nest:nest . .

# production option
# RUN npm run build

EXPOSE 5000

USER nest

CMD ["npm", "run", "start:dev"]

# production option
# RUN npm run prisma:prepare

# production option
# CMD ["node", "dist/main"]

