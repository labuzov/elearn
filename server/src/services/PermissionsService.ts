import { Permissions } from "@Models";

class PermissionsService {
    public getHasUserAccess(userPermissions: Permissions[], requiredPermissions: Permissions[]) {
        let hasAccess = true;

        for (const requiredPermission of requiredPermissions) {
            if (!userPermissions.includes(requiredPermission)) {
                hasAccess = false;
                break;
            }
        }

        return hasAccess;
    }

    public parseObjectsPermissions(objects: any) {
        const key = 'permissions' || 'Permissions';

        for (const obj of objects) {
            if (obj.hasOwnProperty(key)) {
                obj[key] = this.parsePermissionsFromString(obj[key]);
            }
        }

        return objects;
    }

    public parsePermissionsFromString(permissionsString?: string) {
        if (!permissionsString) return [];

        const permissions = permissionsString.split(',');
        const checkedPermissions: Permissions[] = [];

        const validPermissions = Object.values(Permissions).filter(perm => +perm);

        for (const permission of permissions) {
            if (validPermissions.includes(+permission)) {
                checkedPermissions.push(permission as unknown as Permissions);
            }
        }

        return checkedPermissions;
    }

    public parsePermissionsToString(permissions: Permissions[]) {
        return permissions.join(',');
    }
}

export const permissionsService = new PermissionsService();
