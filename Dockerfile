FROM mhart/alpine-node

RUN npm install -g bower gulp

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
COPY bower.json /usr/src/app/
RUN apk add --no-cache git
RUN npm install && bower install --allow-root

CMD [ "gulp", "serve" ]
EXPOSE 9000