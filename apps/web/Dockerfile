FROM node:24-alpine AS build

RUN apk update && apk upgrade --no-cache

WORKDIR /app

ARG BUILD_MODE=staging

COPY package*.json ./
COPY apps/web/package*.json ./apps/web/

RUN npm ci

COPY . .

RUN npm run build --workspace=web -- --mode ${BUILD_MODE}

FROM nginx:alpine

RUN apk update && apk upgrade --no-cache

COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/apps/web/dist /usr/share/nginx/html

RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
