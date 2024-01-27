FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json .

# Install dependencies
RUN npm ci
RUN npm rebuild bcrypt

COPY . ./

EXPOSE 4000

CMD [ "npm", "run", "dev" ]
