FROM alpine:latest

RUN apk add --no-cache nodejs-current
RUN apk add --no-cache yarn
RUN yarn global add @vue/cli

WORKDIR /usr/src/app

CMD ["/bin/sh"]
