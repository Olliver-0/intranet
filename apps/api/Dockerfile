FROM node:24-alpine AS build

RUN apk update && apk upgrade --no-cache

WORKDIR /app

COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY apps/api/prisma ./apps/api/prisma

RUN npm ci

COPY . .

RUN DATABASE_URL="postgresql://docker:docker@localhost:5432/docker" npm run db:generate
RUN npx tsc -p apps/api/tsconfig.json --outDir apps/api/dist --rootDir apps/api

FROM node:24-alpine AS production

RUN apk update && apk upgrade --no-cache

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY apps/api/prisma ./apps/api/prisma

RUN npm ci --omit=dev --ignore-scripts

COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY --from=build /app/apps/api/dist ./apps/api/dist

RUN chown -R node:node /app

USER node

EXPOSE 3000

CMD ["node", "apps/api/dist/src/server.js"]
