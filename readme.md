# BINANCE-PRICE-RECORDER

## Prerequisites

This application needs:

- Node.js version (min v18.12)
- npm (min v8.19)
- a PostgreSQL database with [TimescaleDB](https://docs.timescale.com) extension

### Database

For testing purpose, you can use a local database using Docker.\
Since the data volume is a huge concern, we use [Hypertables](https://docs.timescale.com/getting-started/latest/create-hypertable/) and [compression](https://docs.timescale.com/getting-started/latest/compress-data/) of TimescaleDB extension for PostgreSQL database.

```
docker run --name postgres-server \
-e POSTGRES_USER=<USER_NAME> \
-e POSTGRES_PASSWORD=<USER_PASSWORD> \
-e POSTGRES_DB=<DB_NAME> \
-p 5432:5432 \
-v <LOCAL_ABSOLUTE_PATH>:/home/postgres/pgdata/data \
-d timescale/timescaledb-ha:pg14-latest
```

## Configuration

You have to create a local configuration file `config/local.yaml`.\
In this file, you can set (or override) all configuration keys\
E.g.

```
database:
  host: localhost
  port: 5432
  user: <USER_NAME>
  password: <USER_PASSWORD>
  database: <DB_NAME>
```

## Running

### Before running

You have to install all dependancies using `npm i`

### How to start the application

- `npm start`: creates a process and runs the application. You _must_ build the application before with `npm run build`
- using VSCode launch command `Launch Program`: console outputs will appear in the `DEBUG CONSOLE` of VSCode. You _must_ build the application before with `npm run build`
- using VSCode launch command `Debug locally`: console outputs will appear in the `TERMINAL` of VSCode. You can use breakpoints to debug the app. Application building is done automatically
