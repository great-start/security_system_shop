FROM node:16-alpine

LABEL maintainer="zhenya.bill@gmail.com"

WORKDIR /usr/src/server

COPY --chown=nest:nest package*.json ./

RUN npm ci --only=production

COPY --chown=nest:nest . .

#RUN npm run build

EXPOSE 5000

#CMD npm run start:prod
CMD ["npm", "run", "start:dev"]


