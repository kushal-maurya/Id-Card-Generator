FROM node:18-bullseye-slim

LABEL maintainer="Kushal Maurya <kushal.4428@gmail.com>"

WORKDIR /id-card-generator/

WORKDIR /id-card-generator/id_card_generator_webui
COPY ./id_card_generator_webui/package.json .
RUN npm install --location=project

WORKDIR /id-card-generator/id_card_generator_api
COPY ./id_card_generator_api/package*.json .
RUN npm ci --location=project

WORKDIR /id-card-generator/
