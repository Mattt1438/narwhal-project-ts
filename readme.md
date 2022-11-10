# BINANCE-PRICE-RECORDER

## Prerequisites

This application needs:

- a SQLServer database

### Database

For testing purpose, you can use a local database using Docker.

#### Container creation:

```
$ docker run --name mssql-server \
-e 'ACCEPT_EULA=Y' \
-e 'SA_PASSWORD=<SA_PASSWORD>' \
-p 1433:1433 \
-d mcr.microsoft.com/mssql/server
```

#### Database initialization

```
$ docker exec -it mssql-server /opt/mssql-tools/bin/sqlcmd \
-U SA \
-P "<SA_PASSWORD>" \
-Q "
-- Database creation
USE master;
CREATE DATABASE <DB_NAME>;
GO

-- Login/User creation
USE <DB_NAME>;
CREATE LOGIN <LOGIN_NAME> WITH PASSWORD = '<LOGIN_PASSWORD>';
GO

EXEC sp_changedbowner '<LOGIN_NAME>';
GO
"
```

You have to replace:

- `<SA_PASSWORD>`: System Administrator password
- `<DB_NAME>` AND `<LOGIN_NAME>`: it is recommended to use the same value as SQLServer objects are easily identfied and recognized
- `<LOGIN_PASSWORD>`: Password complexity policies can be found [here](https://learn.microsoft.com/en-us/sql/relational-databases/security/password-policy#password-complexity)

## Configuration

You have to create a local configuration file `config/local.yaml`.\
In this file, you can set (or override) all configuration keys\
E.g.

```
database:
  host: localhost
  port: 1433
  user: <LOGIN_NAME>
  password: <LOGIN_PASSWORD>
  database: <DB_NAME>
```

## Running

How to run the app

- `npm start`: creates a process and runs the application. You _must_ build the application before with `npm run build`
- using VSCode launch command `Launch Program`: console outputs will appear in the `DEBUG CONSOLE` of VSCode. You _must_ build the application before with `npm run build`
- using VSCode launch command `Debug locally`: console outputs will appear in the `TERMINAL` of VSCode. You can use breakpoints to debug the app. Application building is done automatically
