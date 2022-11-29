
ARG APP_DIR=/app

FROM node:18-alpine as base-stage

ARG APP_DIR
WORKDIR $APP_DIR

COPY --chown=node:node dist/apps/binance-price-recorder .
RUN npm i --production --ignore-scripts

RUN npm cache clean --force

CMD ["npm", "start"]
