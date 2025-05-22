import express from 'express';
import authRoutes from './routes/auth-route';
import userRoutes from './routes/user-route';
import { logger } from './middleware/logger-middleware';
// import { responseInterceptor } from './common/interceptors/response.interceptor';
// No Interceptor in node + express
const app = express();
app.use(express.json());
app.use(logger);
// app.use(responseInterceptor);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

export default app;
