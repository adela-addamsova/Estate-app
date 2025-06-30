# Estate form web application
A full-stack real estate app built with:
 - __Frontend:__ React + Vite
 - __Backend:__ Node.js + Koa
 - __Database:__ MongoDB
 - __Environment:__ Docker + Docker Compose

App provides a page with two-step form where user fills in information about estate he wants to sell in the first step (estate type, region, and district), and information about himself in the second step. After submission, data from the form are accessible in MongoDb.

## Prerequisites
 - Docker
 
## Installation
Clone the repository 
```bash
git clone https://github.com/adela-addamsova/estate-app
```
```bash
cd estate-app
```

Run the app
```bash
docker compose up --build
```
This will:
- Build and start the React frontend (Vite dev server on port 5173)
- Start the Node.js backend (Koa API on port 3000)
- Start MongoDB (on port 27017)


## Access the app 
- Frontend: http://localhost:5173
- Database: mongodb://localhost:27017/Estate-app
