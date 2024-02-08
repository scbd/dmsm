
FROM drupal:10.2.2-php8.3

WORKDIR /opt

RUN mkdir dev && mkdir stg
RUN cp -R /opt/drupal /opt/dev/bl1
RUN cp -R /opt/drupal /opt/dev/bl2
RUN cp -R /opt/drupal /opt/stg/bl1
RUN cp -R /opt/drupal /opt/stg/bl2


RUN apt update && \
    apt install curl nodejs npm -y

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

CMD ["node", ".output/server/index.mjs"]