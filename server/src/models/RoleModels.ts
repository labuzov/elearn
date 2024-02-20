export enum Permissions {
    SystemOrganizationCanRead = 100,
    SystemOrganizationCanCreate = 101,
    SystemOrganizationCanUpdate = 102,

    OrganizationCanRead = 200,
    OrganizationCanUpdate = 201,

    RoleCanReadList = 300,
    RoleCanCreate = 301,
    RoleCanUpdate = 302,
    RoleCanDelete = 303,

    UserCanUpdateLogin = 400,
    UserCanUpdateName = 401,
    UserCanUpdateEmail = 402,
    UserCanUpdateTel = 403,
    UserCanUpdateAvatar = 404,
    UserCanUpdateAdditional = 405,

    UserCanReadUserList = 410,
    UserCanCreateUser = 411,

    UserCanUpdateUserLogin = 420,
    UserCanUpdateUserName = 421,
    UserCanUpdateUserEmail = 422,
    UserCanUpdateUserTel = 423,
    UserCanUpdateUserAvatar = 424,
    UserCanUpdateUserAdditional = 425,
    UserCanUpdateUserRole = 426,

    UserCanDeleteUser = 430,
    UserCanResetUserPassword = 431,

    TestCanReadAll = 500,
    TestCanEditAll = 501,
    TestCanCreate = 502,
}
