import { NextFunction, Response, Request } from 'express';

import { NotFoundError, UnauthorizedError } from '@Errors';
import { RequestWithUserInfo } from '@Models';
import { authService, userService } from '@Services';


export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') next();

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        throw new UnauthorizedError();
    }

    const tokenPayload = authService.verifyAccessToken(token);
    if (!tokenPayload) {
        throw new UnauthorizedError();
    }

    const { id, organizationId } = tokenPayload;

    const user = await userService.getUserById(id, organizationId);
    if (!user) {
        throw new NotFoundError();
    }

    (req as RequestWithUserInfo).user = user;

    next();
}
