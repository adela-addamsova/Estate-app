import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Estate from './models/Estate.js';
import mongoSanitize from 'koa-mongo-sanitize';
import helmet from 'koa-helmet';
import { estateSchema } from '../shared/estateSchema.js';
import ratelimit from 'koa-ratelimit';
import Redis from 'ioredis'

dotenv.config();

const app = new Koa();

app.use(async (ctx, next) => {
  ctx.remove('X-Powered-By');
  await next();
});

const PORT = process.env.PORT;
const uri = process.env.MONGO_URI;

mongoose.connect(uri);

app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,
}));

app.use(bodyParser({
  enableTypes: ['json'],
  jsonLimit: '1mb'
}));

app.use(mongoSanitize());
app.use(helmet());

// const redis = new Redis();

// app.use(ratelimit({
//   driver: 'redis',
//   db: redis,
//   duration: 60000,
//   errorMessage: 'Too many requests.',
//   id: (ctx) => ctx.ip,
//   max: 100,
// }));

// Handle estate submissions
app.use(async (ctx, next) => {
  if (ctx.method === 'POST' && ctx.path === '/api/estates') {
    try {
      const parsed = estateSchema.parse(ctx.request.body);
      const estate = new Estate(parsed);
      await estate.save();
      ctx.status = 201;
      ctx.body = { message: 'Estate saved successfully' };
    } catch (err) {
      ctx.status = 400;
      ctx.body = {
        error: 'There was an issue.',
        details: err.errors || err.message,
      };
    }
  } else {
    await next();
  }
});

app.use(async (ctx) => {
  ctx.status = 404;
  ctx.body = 'Endpoint not found';
});

app.listen(PORT);
