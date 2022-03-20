FROM node:16.14.0

WORKDIR /usr/src/app

COPY package.json .
RUN npm install --loglevel notice

COPY .env .

CMD [ "npm", "run", "start:dev" ]