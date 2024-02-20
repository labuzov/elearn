import { Router } from 'express';
import { authController } from '@Controllers';
import { loginSchema } from '@Middlewares';


export const authRouter = Router();

authRouter.post(
    '/login',
    loginSchema,
    authController.login
);

authRouter.get(
    '/refresh',
    authController.refresh
);

authRouter.get(
    '/logout',
    authController.logout
);
