# uptime

Monitor websites status

![Polls of a website during Poland-Colombia - World Cup 2018](img/check_main.png)

## Features

- Custom poll frequency
- Monitor availability, average/standard deviation latency, total uptime/downtime
- JWT Authentication
- Ant Design

## Running

Requirements:

- JDK 8
- Node 8
- Docker
- Gradle

### Development

Clone repository

```sh
$ git clone https://github.com/Nalad/uptime.git
$ cd uptime
```

Run database

```sh
$ cd database
$ docker image build -t database:dev .
$ docker run -e POSTGRES_DB="uptime" -e POSTGRES_USER="postgres" -e POSTGRES_PASSWORD="postgres@123" -p 5432:5432 database:dev
```

Run backend

```sh
$ cd backend
$ gradle wrapper
$ ./gradlew build
$ java -jar ./build/libs/pompom-0.0.1-SNAPSHOT.jar --spring.profiles.active=dev
```

Run frontend

```sh
$ cd frontend
$ npm install
$ npm run dev
```

### Production

Export environment variables: `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`

```sh
$ docker volume create uptime-pgdata
$ docker-compose up
```

## API

All API requests are prefixed with `api`.
API requests require JWT token in Authorization Header.

#### `GET /checks`

Return a list of all checks with polls

#### `POST /checks`

Create a new check

Parameters:

- `uri`: URL of the check
- `name`: name of the check
- `interval`: interval of polling

#### `DELETE /checks`

Delete the check

Parameters:

- `name`: name of the check
