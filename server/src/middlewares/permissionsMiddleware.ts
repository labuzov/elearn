import { NextFunction, Request, Response } from 'express';
import { Permissions } from '@Models';
import { ForbiddenError } from '@Errors';
import { permissionsService } from '@Services';


export const permissionsMiddleware = (requiredPermissions: Permissions[], ...alternativePermissions: Permissions[][]) => {
    return async function(req: Request, res: Response, next: NextFunction) {
        if (req.method === 'OPTIONS') next();

        const userPermissions = [Permissions.OrganizationCanRead]
        // const userPermissions: Permissions[] = [];

        let hasAccess = permissionsService.getHasUserAccess(userPermissions, requiredPermissions);
        
        if (alternativePermissions.length) {
            for (const permissions of alternativePermissions) {
                if (permissionsService.getHasUserAccess(userPermissions, permissions)) {
                    hasAccess = true;
                    break;
                }
            }
        }

        if (!hasAccess) {
            throw new ForbiddenError();
        }

        next();
    }
}
