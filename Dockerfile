FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN yarn

COPY . .

RUN yarn build

FROM node:18-alpine AS prod_deps

WORKDIR /app

COPY package-prod.json ./package.json
RUN yarn

FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY --from=builder /app/dist ./dist
COPY --from=prod_deps /app/node_modules ./node_modules
COPY --from=prod_deps /app/package.json ./package.json
COPY ./server.js ./server.js

RUN chown -R 1001:1001 /app
RUN chmod 755 /app

USER 1001

EXPOSE 3000

CMD ["npm", "start"]
