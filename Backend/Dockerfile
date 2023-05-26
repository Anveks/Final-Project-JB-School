# Linux Alpine 3.17.x + Node.js 18.x
FROM node:18-alpine3.17

# Run command in a terminal when image is building - Install global libraries: 
RUN npm i -g ts-node

# Intall also nodemon for Hot-Reloading the container:
RUN npm i -g nodemon

# Create our application directory: 
WORKDIR /app

# Copy only package.json and package-lock.json into /app:
COPY package*.json /app

# Restore node_modules:
RUN npm i

# Take current directory and copy it into /app inside the image:
COPY . /app

# ---------------------------------------
# Running the container:

# When container runs - which command should we use to run our app:
ENTRYPOINT npm start

# building the image:
# docker build -t <image-name> <Dockerfile location>
# docker build -t vacations-api .

# creating container that runs the image:
# docker create --name <container-name> -p <host-port -> container-port> <image-name>
# docker create --name vacations-container -p 4000:4004 vacations-api

# run container:
# docker start <container-name>
# docker start vacations-container