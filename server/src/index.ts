import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'module-alias/register';
import 'express-async-errors';

import { errorHandler } from '@Middlewares';
import { organizationRouter, userRouter, authRouter, testRouter } from '@Routes';
import { securityService } from '@Services';


dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.use(cors({ credentials: true, origin: true }))
app.use(express.json());
app.use(cookieParser());

// Security
app.use(securityService.getLimiter());
app.use(securityService.getHelmet());

// Routes
app.use('/api/organization', organizationRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/test', testRouter);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
