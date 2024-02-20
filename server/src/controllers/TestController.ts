import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { BadRequestError, ForbiddenError, UnauthorizedError } from '@Errors';
import { permissionsService, testService, validationService } from '@Services';
import { Permissions, RequestWithUserInfo } from '@Models';
import { getTestDto } from '@Dto';


class TestController {
    public async createTest(req: Request, res: Response) {
        const { title, questions, readIds, durationInMinutes } = req.body;
        const { id, organizationId, permissions } = (req as RequestWithUserInfo).user;

        if (!organizationId || !permissions) {
            throw new UnauthorizedError();
        }

        if (!permissionsService.getHasUserAccess(permissions, [Permissions.TestCanCreate])) {
            throw new ForbiddenError();
        }

        const errors = validationService.parseValidationResult(validationResult(req));
        if (errors.length) {
            throw new BadRequestError({ errors });
        }

        const newTest = await testService.createTest({
            organizationId,
            createdBy: id,
            title,
            questions,
            readIds,
            durationInMinutes
        });

        return res.json(getTestDto(newTest!));
    }
}

export const testController = new TestController();
