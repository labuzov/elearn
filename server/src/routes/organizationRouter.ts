import { Router } from 'express';
import { organizationController } from '@Controllers';
import { createOrganizationSchema, updateOrganizationSchema, userMiddleware } from '@Middlewares';


export const organizationRouter = Router();

organizationRouter.get(
    '/',
    userMiddleware,
    organizationController.getOrganizationById
);

organizationRouter.post(
    '/create',
    userMiddleware,
    createOrganizationSchema,
    organizationController.createOrganization
);

organizationRouter.put(
    '/update',
    userMiddleware,
    updateOrganizationSchema,
    organizationController.updateOrganization
);
