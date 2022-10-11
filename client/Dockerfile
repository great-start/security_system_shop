#FROM node:16-alpine AS builder
FROM node:16-alpine

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

EXPOSE 3000

#RUN npm run build
CMD ["npm", "run", "dev"]


# Production configuration
#FROM nginx:alpine AS production
#
#LABEL maintainer="zhenya.bill@gmail.com"
#
#COPY --from=builder app/build usr/share/nginx/html
#
#COPY nginx.conf etc/nginx/conf.d/default.conf
#
#EXPOSE 3000
#
#CMD ["nginx", "-g", "daemon off;"]

