FROM node:15.2.1-alpine3.10 as build

RUN apk --no-cache add --virtual native-deps \
    g++ gcc libgcc libstdc++ linux-headers make python2 && \
    npm install --quiet node-gyp -g

WORKDIR /usr/src/backend
COPY src/backend/package*.json ./
RUN npm ci

COPY src/backend .
RUN npm run build

WORKDIR /usr/src/frontend

COPY src/frontend/package*.json ./
RUN npm ci

COPY src/frontend .
RUN npm run build

FROM node:15.2.1-alpine3.10

WORKDIR /usr/src/app

COPY --from=build /usr/src/backend/node_modules node_modules
COPY --from=build /usr/src/backend/dist/main.bundle.js .
COPY --from=build /usr/src/frontend/dist public

EXPOSE 80

CMD ["node", "main.bundle.js"]
