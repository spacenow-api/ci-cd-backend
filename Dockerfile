FROM node:8

RUN mkdir /app
WORKDIR /app
ADD . /app

ADD yarn.lock /app/yarn.lock
ADD package.json /app/package.json

ENV PATH /app/node_modules/.bin:$PATH
RUN yarn

EXPOSE 3000

ENTRYPOINT ["/bin/bash", "/app/run.sh"]
CMD ["start"]