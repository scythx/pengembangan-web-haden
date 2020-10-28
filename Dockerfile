FROM alpine:latest

<<<<<<< HEAD
RUN apk add --no-cache nodejs
=======
RUN apk add --no-cache nodejs-current
>>>>>>> 3afb589c1a6119283e6f4f0a8f899793bd257041
RUN apk add --no-cache yarn

WORKDIR /usr/src/app

CMD ["/bin/sh"]
