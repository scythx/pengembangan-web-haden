FROM nginx:alpine

RUN apk add --no-cache \
 unzip \
 wget

WORKDIR /etc/nginx

COPY fullchain.pem ./
COPY privkey.pem ./

RUN rm nginx.conf \
 && wget https://github.com/abirajabi/harden/releases/latest/download/nginx.zip \
 && unzip nginx.zip \
 && rm nginx.zip

WORKDIR /usr/src/app

RUN wget https://github.com/abirajabi/harden/releases/latest/download/frontend.zip \
 && unzip frontend.zip \
 && rm frontend.zip
