FROM node:8

RUN mkdir /app
WORKDIR /app
ADD . /app

ADD yarn.lock /app/yarn.lock
ADD package.json /app/package.json

ENV PATH /app/node_modules/.bin:$PATH
RUN yarn
RUN babel-node tools/run clean
RUN babel-node tools/run extractMessages
RUN babel-node tools/run copy
RUN babel-node tools/run bundle

EXPOSE 3000

ENTRYPOINT ["node","build/server.js"]
