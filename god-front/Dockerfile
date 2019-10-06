FROM node:10
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN rm -rf node_modules

RUN npm install
RUN npm rebuild node-sass --force

EXPOSE 3000
CMD [ "npm", "start" ]
