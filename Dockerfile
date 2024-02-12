
FROM drupal:10.2.2-php8.3

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

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn clean-reinstall

COPY . ./

RUN yarn build

ENV PORT 8000

EXPOSE 8000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=8000

ARG TAG
ENV NUXT_PUBLIC_TAG $TAG

ARG VERSION
ENV NUXT_PUBLIC_COMMIT $VERSION

ARG BRANCH
ENV NUXT_PUBLIC_BRANCH $VERSION

CMD ["node", ".output/server/index.mjs"]