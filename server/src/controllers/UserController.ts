import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { BadRequestError, ForbiddenError, UnauthorizedError } from '@Errors';
import { permissionsService, userService, validationService } from '@Services';
import { Permissions, RequestWithUserInfo } from '@Models';
import { getUserDto } from '@Dto';


class UserController {
    public async createUser(req: Request, res: Response) {
        const { login, password, roleId, name, surname, patronymic, email, tel, additional } = req.body;
        const { organizationId, permissions } = (req as RequestWithUserInfo).user;

        if (!organizationId || !permissions) {
            throw new UnauthorizedError();
        }

        if (!permissionsService.getHasUserAccess(permissions, [Permissions.UserCanCreateUser])) {
            throw new ForbiddenError();
        }

        const errors = validationService.parseValidationResult(validationResult(req));
        if (errors.length) {
            throw new BadRequestError({ errors });
        }

        const newUser = await userService.createUser({
            login,
            password,
            organizationId,
            roleId,
            name,
            surname,
            patronymic,
            email,
            tel,
            additional
        });

        return res.json(getUserDto(newUser!));
    }
}

export const userController = new UserController();
