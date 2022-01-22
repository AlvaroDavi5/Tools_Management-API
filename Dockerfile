
FROM node:alpine
LABEL Description="Docker Image for NodeJS"
LABEL org.opencontainers.image.authors="alvaro.davsa@gmail.com"
ENV Version="1.0.0"

WORKDIR /home/node/UNID_API
USER root

COPY package*.json *.lock ./
RUN yarn install
COPY ./ ./
CMD [ "node", "src/app.js" ]

EXPOSE 3000
