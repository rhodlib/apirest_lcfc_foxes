import express, { Application } from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth';
import matchRoutes from './routes/match';

const app: Application = express();

//Settings
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(express.json());
app.use(morgan('dev'));

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/match', matchRoutes);

export default app;
