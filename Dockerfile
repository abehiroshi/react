FROM dockerfile/nodejs
MAINTAINER Abe Hiroshi <abe@x-wave.co.jp>

WORKDIR /app

ADD package.json /app/package.json
RUN npm install

EXPOSE 3000
