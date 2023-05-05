# version of node to use
FROM node:16
# define working directory for docker
WORKDIR /usr/src/app
# copy all our source code into the working directory
COPY . .
COPY package.json ./
# install npm dependencies and pm2
ENV PRISMA_BINARIES_MIRROR http://prisma-builds.s3-eu-west-1.amazonaws.com
RUN npm install && npm install -g nodemon
# expose port 4000 for our server to run on
EXPOSE 4000
# command to start our server
CMD [ "nodemon", "start" ]