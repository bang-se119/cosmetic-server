# Use the official Node.js 18 image as the base image
FROM node:18.16-alpine AS builder


ENV TZ=Asia/Ho_Chi_Minh
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ /etc/timezone

# Set the working directory in the container to /cosmetic-server
WORKDIR /cosmetic-server

# Copy the package.json and package-lock.json files to the container -> Cap quyen
COPY --chown=node:node package*.json ./
COPY --chown=node:node tsconfig.json ./

COPY --chown=node:node . .

# Install the dependencies | yarn
RUN npm install 

# Copy the rest of the application code to the container
COPY . .

# Build the production version of the application
RUN npm run build

# Use a lightweight Node.js 18 image as the base image
FROM node:18.16-alpine as production

ENV TZ=Asia/Ho_Chi_Minh
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ /etc/timezone

# Set the working directory in the container to /cosmetic-server
WORKDIR  /cosmetic-server

# Copy the production build files from the builder image to the container
COPY --from=builder  /cosmetic-server/dist ./dist
COPY --from=builder  /cosmetic-server/.env/ ./.env
COPY --from=builder  /cosmetic-server/node_modules ./node_modules


COPY package*.json ./
COPY tsconfig.json ./

EXPOSE 4400

VOLUME [ "/cosmetic-server/node_modules" ]

# Start the NestJS application
CMD ["npm","run" , "start:prod"]