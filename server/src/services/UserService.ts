import bcrypt from 'bcrypt';
import db from '@DataBase';
import { UserCreateModel, UserModel } from '@Models';
import { dataBaseService } from './DataBaseService';
import { validationService } from './ValidationService';
import { permissionsService } from './PermissionsService';


class UserService {
    public async createUser(model: UserCreateModel) {
        const { login, password, organizationId, roleId, name, surname, patronymic, email, tel, additional } = model;

        const hashPassword = await bcrypt.hash(password, 6);

        const result = await db.query(`INSERT INTO "Users" ("Login", "OrganizationId", "Password", "RoleId", "Name", "Surname", "Patronymic", "Email", "Tel", "Additional") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`, [login, organizationId, hashPassword, roleId, name, surname, patronymic, email, tel, additional]);

        if (result) return permissionsService.parseObjectsPermissions(dataBaseService.parseObjectsFirstLetters(result.rows))[0] as UserModel;
    }

    public async getUserById(id: number, organizationId: number) {
        const result = await db.query(`SELECT * FROM "Users" JOIN "Roles" ON "Users"."Id" = $1 AND "Users"."OrganizationId" = $2 AND "Users"."RoleId" = "Roles"."Id"`, [id, organizationId]);

        if (result) return permissionsService.parseObjectsPermissions(dataBaseService.parseObjectsFirstLetters(result.rows))[0] as UserModel;
    }

    public async getAllUsersByLogin(login: string) {
        const result = await db.query(`SELECT * FROM "Users" JOIN "Roles" ON "Users"."Login" = $1 AND "Users"."RoleId" = "Roles"."Id"`, [login]);

        if (result) return permissionsService.parseObjectsPermissions(dataBaseService.parseObjectsFirstLetters(result.rows)) as UserModel[];
    }
}

export const userService = new UserService();
