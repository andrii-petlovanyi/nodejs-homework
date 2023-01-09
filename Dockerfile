FROM node:16-alpine

WORKDIR /server

COPY package*.json ./
RUN npm install

COPY . .

CMD npm start

# docker build -t express .
# docker run -p 3002:3002 express