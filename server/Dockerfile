FROM node:slim

WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . /app
COPY .env /app
EXPOSE 3000
CMD ["node", "server.js"]

