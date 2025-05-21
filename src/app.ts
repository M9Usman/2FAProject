import express from 'express';
import authRoutes from './api/auth/routes/auth.routes';
import userRoutes from './api/user/routes/user.routes';
import { logger } from './common/middleware/logger.middleware';
import { responseInterceptor } from './common/interceptors/response.interceptor';

const app = express();
app.use(express.json());
app.use(logger);
app.use(responseInterceptor);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

export default app;
