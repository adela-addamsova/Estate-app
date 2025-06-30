import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Estate from './models/Estate.js';
import mongoSanitize from 'koa-mongo-sanitize';
import helmet from 'koa-helmet';
import { estateValidationSchema } from 'shared';

/** Load environment variables from .env file */
dotenv.config();

/** Get environment variables */
const PORT = process.env.PORT;
const uri = process.env.MONGO_URI;

/** Create a new Koa application instance */
const app = new Koa();

/** Connect to MongoDB using Mongoose */
mongoose.connect(uri);

/** 
 * Enable CORS with credentials and custom origin 
 * specified via environment variable
 */
app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,
}));

/** 
 * Middleware to remove the 'X-Powered-By' header 
 * to prevent exposing framework details
 */
app.use(async (ctx, next) => {
  ctx.remove('X-Powered-By');
  await next();
});

/** 
 * Parse JSON request bodies with a limit of 1MB 
 * and only allow JSON content type
 */
app.use(bodyParser({
  enableTypes: ['json'],
  jsonLimit: '1mb'
}));

/** Sanitize incoming data to prevent NoSQL injection attacks */
app.use(mongoSanitize());

/** Add security-related HTTP headers */
app.use(helmet());

/**
 * Handle POST requests to /lead
 * Validates input using Zod schema, saves to MongoDB, and returns appropriate status
 */
app.use(async (ctx, next) => {
  if (ctx.method === 'POST' && ctx.path === '/lead') {
    try {
      const parsed = estateValidationSchema.parse(ctx.request.body);
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

/**
 * Catch-all middleware for unmatched routes
 * Returns a 404 Not Found response
 */
app.use(async (ctx) => {
  ctx.status = 404;
  ctx.body = 'Endpoint not found';
});

/** Start the Koa server */
app.listen(PORT);
