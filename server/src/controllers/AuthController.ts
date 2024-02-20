import { Response, Request } from 'express';
import { validationResult } from 'express-validator';

import { BadRequestError, UnauthorizedError } from '@Errors';
import { authService, userService, validationService } from '@Services';
import { getUserDto } from '@Dto';


const tokenCookieName = 'refreshToken';

class AuthController {

    public async login(req: Request, res: Response) {
        const { key, login, password } = req.body;

        const errors = validationService.parseValidationResult(validationResult(req));
        if (errors.length) {
            throw new BadRequestError({ errors });
        }

        const users = await userService.getAllUsersByLogin(login);

        if (!users?.length) {
            throw new BadRequestError({ errors: [{ message: 'Invalid login or password' }] });
        }

        for (const user of users) {
            if (authService.comparePasswords(password, user.password)) {
                const tokens = authService.generateTokens(key, user.id, user.organizationId);

                await authService.saveToken(key, user.id, tokens.refreshToken);

                res.cookie(tokenCookieName, tokens.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });

                return res.json({
                    token: tokens.accessToken,
                    user: getUserDto(user, true)
                });
            }
        }

        throw new BadRequestError();
    }

    public async refresh(req: Request, res: Response) {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            throw new UnauthorizedError();
        }

        const tokenPayload = authService.verifyRefreshToken(refreshToken);
        if (!tokenPayload) {
            throw new UnauthorizedError();
        }

        const { key, id, organizationId } = tokenPayload;

        const user = await userService.getUserById(id, organizationId);

        const tokens = await authService.getAllTokens(id);
        const tokenFromDb = tokens?.find(token => token.key === key);

        if (!user || !tokenFromDb) {
            throw new UnauthorizedError();
        }

        const newTokens = authService.generateTokens(key, id, organizationId);
        await authService.updateToken(key, id, newTokens.refreshToken);

        return res.json({
            token: newTokens.accessToken,
            user: getUserDto(user, true)
        })
    }

    public async logout(req: Request, res: Response) {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            throw new UnauthorizedError();
        }

        await authService.removeToken(refreshToken);
        res.clearCookie(tokenCookieName);

        return res.json();
    }
}

export const authController = new AuthController();
