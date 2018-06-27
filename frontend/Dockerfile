FROM node:8-alpine as builder
RUN mkdir /app
COPY package.json package-lock.json /app/
WORKDIR /app
RUN npm install
COPY . /app
RUN npm run build

FROM nginx:1.14-alpine
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx
COPY --from=builder /app/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


