import { UserDtoModel, UserExtendedDtoModel, UserModel } from "@Models";
import { permissionsService } from "@Services";

export const getUserDto = (user: UserModel, isExtended?: boolean): UserDtoModel | UserExtendedDtoModel => {
    const {
        id,
        login,
        organizationId,
        roleId,
        name,
        surname,
        patronymic,
        email,
        tel,
        avatar,
        additional,
        roleName,
        permissions
    } = user;

    let userDto = {
        id,
        login,
        organizationId,
        roleId,
        name,
        surname,
        patronymic,
        email,
        tel,
        avatar,
        additional
    }

    if (isExtended) {
        return {
            ...userDto,
            roleName,
            permissions
        } as UserExtendedDtoModel;
    }

    return userDto as UserDtoModel;
}
