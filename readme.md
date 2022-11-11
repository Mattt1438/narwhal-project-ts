# BINANCE-PRICE-RECORDER

## Prerequisites

This application needs:

- a PostgreSQL database

### Database

For testing purpose, you can use a local database using Docker.

```
docker run --name postgres-server \
-e POSTGRES_USER=<USER_NAME> \
-e POSTGRES_PASSWORD=<USER_PASSWORD> \
-e POSTGRES_DB=<DB_NAME> \
-p 5432:5432 \
-d postgres
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

How to run the app

- `npm start`: creates a process and runs the application. You _must_ build the application before with `npm run build`
- using VSCode launch command `Launch Program`: console outputs will appear in the `DEBUG CONSOLE` of VSCode. You _must_ build the application before with `npm run build`
- using VSCode launch command `Debug locally`: console outputs will appear in the `TERMINAL` of VSCode. You can use breakpoints to debug the app. Application building is done automatically
