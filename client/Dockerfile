FROM node:16-alpine AS builder

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci
#RUN npm ci --only=production

COPY --chown=node:node . .

RUN npm run build


# Final production configuration
FROM nginx:alpine AS production

LABEL maintainer="zhenya.bill@gmail.com"

COPY --from=builder app/build usr/share/nginx/html

COPY nginx.conf etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]

