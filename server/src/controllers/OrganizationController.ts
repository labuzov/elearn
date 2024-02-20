import { Response, Request } from 'express';
import { validationResult } from 'express-validator';

import { BadRequestError, ForbiddenError, NotFoundError } from '@Errors';
import { organizationService, permissionsService, validationService } from '@Services';
import { Permissions, RequestWithUserInfo } from '@Models';
import { getOrganizationDto } from '@Dto';


class OrganizationController {
    public async getOrganizationById(req: Request, res: Response) {
        const { id } = req.query;
        const { permissions, organizationId } = (req as RequestWithUserInfo).user || {};

        if (!id) {
            throw new BadRequestError();
        }

        // if (
        //     !permissionsService.getHasUserAccess(permissions, [Permissions.SystemOrganizationCanRead]) &&
        //     !(permissionsService.getHasUserAccess(permissions, [Permissions.OrganizationCanRead]) && organizationId === +id)
        // ) {
        //     throw new ForbiddenError();
        // }

        const result = await organizationService.getOrganizationById(+id);
        if (!result) {
            throw new NotFoundError();
        }

        return res.json(getOrganizationDto(result));
    }

    public async createOrganization(req: Request, res: Response) {
        const { title, place, email, tel, additional } = req.body;
        const { permissions } = (req as RequestWithUserInfo).user;

        // if (!permissionsService.getHasUserAccess(permissions, [Permissions.SystemOrganizationCanCreate])) {
        //     throw new ForbiddenError();
        // }

        const errors = validationService.parseValidationResult(validationResult(req));
        if (errors.length) {
            throw new BadRequestError({ errors });
        }

        const result = await organizationService.createOrganization({
            title,
            place,
            email,
            tel,
            additional
        });

        return res.json(getOrganizationDto(result!));
    }

    public async updateOrganization(req: Request, res: Response) {
        const { id, title, place, email, tel, additional } = req.body;
        const { permissions, organizationId } = (req as RequestWithUserInfo).user;

        if (
            !permissionsService.getHasUserAccess(permissions, [Permissions.SystemOrganizationCanUpdate]) ||
            !(permissionsService.getHasUserAccess(permissions, [Permissions.OrganizationCanUpdate]) && organizationId === +id)
            
        ) {
            throw new ForbiddenError();
        }

        const errors = validationService.parseValidationResult(validationResult(req));
        if (errors.length) {
            throw new BadRequestError({ errors });
        }

        const organization = await organizationService.getOrganizationById(id);
        if (!organization) {
            throw new NotFoundError();
        }

        const result = await organizationService.updateOrganization({
            id,
            title,
            place,
            email,
            tel,
            additional
        });

        return res.json(getOrganizationDto(result!));
    }
}

export const organizationController = new OrganizationController();
