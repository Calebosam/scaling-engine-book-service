FROM node:18-bullseye-slim

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn 

COPY . .

RUN yarn db:generate

CMD [ "yarn", "start" ]