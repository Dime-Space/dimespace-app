# Etapa de build
FROM node:lts-alpine AS builder

WORKDIR /app
COPY package.json yarn.lock ./
RUN corepack enable && yarn install --immutable --immutable-cache
COPY . .
RUN yarn build  # <-- Aqui você gera o dist/

# Etapa de produção
FROM node:lts-alpine AS production

WORKDIR /app
COPY --from=builder /app /app

EXPOSE 3000
CMD ["yarn", "preview"]
