FROM alpine:latest

RUN apk add --no-cache nodejs
RUN apk add --no-cache yarn

WORKDIR /usr/src/app

CMD ["/bin/sh"]
