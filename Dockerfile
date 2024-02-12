
FROM drupal:10.2.2-php8.3 as base

WORKDIR /opt/drupal

RUN composer require drush/drush

WORKDIR /opt

RUN mkdir dev && mkdir stg
RUN cp -R /opt/drupal /opt/dev/bl1
RUN cp -R /opt/drupal /opt/dev/bl2
RUN cp -R /opt/drupal /opt/stg/bl1
RUN cp -R /opt/drupal /opt/stg/bl2


RUN apt update && \
    apt install curl nodejs npm nano -y

RUN npm install -g yarn

FROM base as build

WORKDIR /usr/src/app

COPY --link package.json yarn.lock ./

RUN yarn clean-reinstall

COPY --link . ./

RUN yarn build

FROM base

COPY --from=build .output .output

WORKDIR /usr/src/app/.output
ENV PORT 8000

EXPOSE 8000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=8000

CMD ["node", "server/index.mjs"]