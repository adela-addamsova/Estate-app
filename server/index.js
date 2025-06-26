import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Estate from './models/Estate.js';

dotenv.config();

const app = new Koa();

const PORT = process.env.PORT;
const uri = process.env.MONGO_URI;

mongoose.connect(uri);

// CORS configuration (adjust origin for production use)
app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,
}));

app.use(bodyParser());

// Handle preflight requests
app.use(async (ctx, next) => {
  if (ctx.method === 'OPTIONS') {
    ctx.status = 204;
    return;
  }
  await next();
});

// Handle estate submissions
app.use(async (ctx, next) => {
  if (ctx.method === 'POST' && ctx.path === '/api/estates') {
    try {
      const estate = new Estate(ctx.request.body);
      await estate.save();
      ctx.status = 201;
      ctx.body = { message: 'Estate saved successfully' };
    } catch (err) {
      ctx.status = 400;
      ctx.body = {
        error: 'Uložení nemovitosti se nezdařilo.',
        details: err.message
      };
    }
  } else {
    await next();
  }
});

// Default fallback
app.use(async (ctx) => {
  ctx.status = 404;
  ctx.body = 'Endpoint not found';
});

app.listen(PORT);
