# 1st commad tells docker to use the node image from dockerhub
FROM node:18-alpine

RUN npm install -g nodemon

# Work Directory
WORKDIR /tv_app_server

# This is for caching... if we make a change to our app when we build we wont have to keep running npm install since it wont be changed everything above this will be cached
# We copy the package.json to the image
COPY package.json .

RUN npm install

# Copy... copy lets us copy what we want from our currrent directory into the container.. in our case this is our root directory ./ EVERYTHING IN SERVER IS WHAT WE WANT TO COPY TO OUT CONTAINERs ROOT DIRECTORY WHICH IS /practice1
# /practice1 is the folder/root we are going to copy or api into root hence .
COPY . .

# We need this for docker desktop container
EXPOSE 5001

CMD ["npm","run","docker"]