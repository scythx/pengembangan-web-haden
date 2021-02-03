FROM node:current-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache \
 unzip \
 wget

RUN wget https://github.com/abirajabi/harden/releases/latest/download/backend.zip \
 && unzip backend.zip \
 && rm backend.zip \
 && npm ci

CMD ["node", "main.bundle.js"]
