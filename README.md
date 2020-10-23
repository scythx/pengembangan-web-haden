# Harden

## Setup & Running

### Windows & Linux

Create `.env` file within project root directory with following content

``` text
NODE_ENV=development
PORT=8080
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_DATABASE=postgres
DB_PASSWORD=secret
```

Install project dependencies with following command

``` sh
$ npm install
```

``` sh
$ npm run build
```

``` sh
$ npm run watch
```

``` sh
$ npm run serve
```

### Docker

Create `.env` file within project root directory with following content

``` text
NODE_ENV=development
PORT=8080
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_DATABASE=postgres
DB_PASSWORD=secret
```

Run `postgres` and `development-environment` containers with following command

``` sh
$ docker-compose up
```

Get names of running containers with following command. From the result below, we can see that `fbbb345b9cb9` is the name of `development-environment` container

``` sh
$ docker ps

CONTAINER ID        NAMES                                       
fbbb345b9cb9        iogithubscythxpengembangan-web-haden_web_1
a99a90021232        iogithubscythxpengembangan-web-haden_db_1
```

Install project dependencies with following command

``` sh
$ docker exec --it fbbb345b9cb9 yarn install
```

``` sh
$ docker exec --it fbbb345b9cb9 yarn run build
```

``` sh
$ docker exec --it fbbb345b9cb9 yarn run watch
```

``` sh
$ docker exec --it fbbb345b9cb9 yarn run serve
```
