FROM node:23-alpine
WORKDIR /usr/src
COPY package.json ./
RUN npm install
COPY . .
RUN npm install
EXPOSE 5173

CMD ["npm", "run", "dev"]