FROM node:11

WORKDIR /app

COPY package.json .
RUN npm install 

COPY . .

CMD ["npm", "start"]