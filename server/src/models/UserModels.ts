import { Request } from 'express';
import { Permissions } from './RoleModels';


export type UserModel = {
    id: number;
    login: string;
    organizationId: number;
    roleId: number;
    name: string;
    surname: string;
    patronymic?: string;
    email?: string;
    tel?: string;
    avatar?: string;
    additional?: string;
    password: string;
    cannotBeDeleted?: boolean;
    roleName?: string;
    permissions: Permissions[];
}

export type UserDtoModel = {
    id: number;
    login: string;
    organizationId: number;
    roleId: number;
    name: string;
    surname: string;
    patronymic?: string;
    email?: string;
    tel?: string;
    avatar?: string;
    additional?: string;
}

export type UserExtendedDtoModel = UserDtoModel & {
    roleName: string;
    permissions: Permissions[];
}

export type UserCreateModel = {
    login: string;
    password: string;
    organizationId: number;
    roleId: number;
    name: string;
    surname: string;
    patronymic?: string;
    email?: string;
    tel?: string;
    additional?: string;
}

export type RequestWithUserInfo = Request & {
    user: UserModel;
};
