#Build node image from Node Docker Hub
FROM node:alpine3.10

RUN adduser node root

#Make app directory in container
RUN mkdir /app

#Identify working directory
WORKDIR /app

#Copy package
COPY package.json /app

#Install rpm packages from package.json
RUN npm install

#Copy over app to app folder
COPY . /app

RUN chmod -R 775 /app
RUN chown -R node:root /app

#Expose server at port ( accessible outside of container)
EXPOSE 3001 

#Start app 
CMD ["npm", "start"]