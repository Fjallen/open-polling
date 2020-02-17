# base image
FROM node:12.14.0

# set working directory
WORKDIR /usr/src/app
# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install
COPY . .

# start app
CMD ["npm", "start"]
