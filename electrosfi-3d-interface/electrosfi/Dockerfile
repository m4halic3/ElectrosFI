# estágio de compilação
FROM node:14 as build-stage
WORKDIR .
COPY package*.json ./
RUN npm install
COPY ./.env ./.env
COPY . .
RUN npm run build

# estágio de produção
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]