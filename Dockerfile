
ARG APP_DIR=/app

# ---------------------------------------------------------------------------- #
FROM node:18-slim as base-stage

ARG APP_DIR
WORKDIR $APP_DIR

COPY --chown=node:node package.json package-lock.json* ./
RUN npm ci --production --ignore-scripts

# ---------------------------------------------------------------------------- #
FROM base-stage as build-stage

ARG APP_DIR
WORKDIR $APP_DIR
COPY --chown=node:node --from=base-stage $APP_DIR .
RUN npm install
COPY --chown=node:node . .
RUN npm run build

# ---------------------------------------------------------------------------- #
FROM base-stage as final-stage

ARG APP_DIR
WORKDIR $APP_DIR
COPY --chown=node:node . .
COPY --chown=node:node --from=base-stage $APP_DIR .
COPY --chown=node:node --from=build-stage $APP_DIR/dist ./dist
RUN npm cache clean --force

CMD ["npm", "start"]