import { Router } from 'express';
import { userMiddleware } from '@Middlewares';
import { testController } from '@Controllers';


export const testRouter = Router();

testRouter.post(
    '/create',
    userMiddleware,
    testController.createTest
);
