FROM node:21

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

# npm run start:dev
CMD [ "npm", "run", "start:dev" ]
