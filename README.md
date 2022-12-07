# Narwhal-Project-TS

## Description

TODO

## Projects

### Apps

#### api

A Express server serves routes to fetch datas about prices

#### binance-price-recorder

A service that save some crypto information updates from Binance

### Libs

#### database

- Client
- Interfaces
- Abstract classes for Repositories
- Migration files

#### logger

A single class for logging process of backend apps

## Requirements

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

## Running project

To run the entire stack locally, you can use `npm start`. All projects will be built and run with their local configurations. You have to install all dependencies with `npm i`.

## Debugging

To debug a sub-project, you can run `[npx ]nx debug --project=<sub-project-name>` and attach a debugger on port `7777`. There is a VSCode debug config in `.vscode/launch.json`

## Deployment

At this time, the only command line available is `npm run deploy`. It creates a Docker image for each project and exports it into `./deploy` directory.
