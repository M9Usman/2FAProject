// src/app.ts
import express from 'express';
import routes from './routes';
import { logger } from './middleware/logger.middleware';
import { errorHandler } from './middleware/error.middleware';

const app = express();

app.use(express.json());
app.use(logger);

// Mount the unified route with `/api` prefix here
app.use('/api', routes);

// ⚠️ IMPORTANT: Error handler must be LAST middleware
// It catches errors from all previous middleware and routes
app.use(errorHandler);

export default app;
