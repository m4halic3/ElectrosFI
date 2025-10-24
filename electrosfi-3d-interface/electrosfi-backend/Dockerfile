# estágio de compilação
FROM node:14 as build-stage
WORKDIR .
COPY package*.json ./
RUN npm install
COPY . .
CMD npm start