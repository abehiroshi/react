FROM node:0.12
MAINTAINER Abe Hiroshi <abe@x-wave.co.jp>

WORKDIR /app

ADD package.json /app/package.json
RUN npm install

ADD . /app

EXPOSE 3000
