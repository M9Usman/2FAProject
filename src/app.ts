// src/app.ts
import express from 'express';
import routes from './routes';
import { logger } from './middleware/logger.middleware';

const app = express();

app.use(express.json());
app.use(logger);

// Mount the unified route with `/api` prefix here
app.use('/api', routes);

export default app;
