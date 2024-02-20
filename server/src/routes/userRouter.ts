import { Router } from 'express';
import { userController } from '@Controllers';
import { createUserSchema, userMiddleware } from '@Middlewares';


export const userRouter = Router();

userRouter.post(
    '/create',
    userMiddleware,
    createUserSchema,
    userController.createUser
);
