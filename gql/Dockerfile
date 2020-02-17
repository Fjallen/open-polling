# base image
FROM node:12.14.0

# set working directory
WORKDIR /usr/src/gql
# install and cache app dependencies
COPY package.json /usr/src/gql/package.json
RUN npm install
COPY . .

# start app
CMD ["npm", "start"]
