FROM node:20-alpine

WORKDIR /app

COPY shared ./shared
COPY client ./client
WORKDIR /app/shared
RUN npm install
WORKDIR /app/client
RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev"]
