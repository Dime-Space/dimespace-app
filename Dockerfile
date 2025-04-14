FROM node:lts-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN corepack enable && yarn install --immutable --immutable-cache

COPY . .

EXPOSE 3000

CMD ["yarn", "preview"]