FROM node:21.1.0 as build-stage
WORKDIR /app
COPY package*.json ./

RUN npm install --global npm@10.2.4
RUN npm install

COPY . .

RUN npm run build


FROM nginx:alpine as production-stage
COPY nginx.conf /etc/nginx/nginx.conf


COPY --from=build-stage /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

