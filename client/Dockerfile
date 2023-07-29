# 1st commad tells docker to use the node image from dockerhub
FROM node:18-alpine

# Work Directory
WORKDIR /tv_app_frontend_docker

# We copy the package.json to the image ... . is for the root directory where the dockefile is located
COPY package.json .

# This going to install all the dependieces we need after we copy the package.json
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","start"]