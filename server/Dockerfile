FROM node:20-alpine

WORKDIR /app

COPY shared ./shared
COPY server ./server
WORKDIR /app/shared
RUN npm install
WORKDIR /app/server
RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]
