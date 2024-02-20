import { OrganizationDtoModel, OrganizationModel } from '@Models';

export const getOrganizationDto = (organization: OrganizationModel): OrganizationDtoModel => {
    const {
        id,
        title,
        email,
        tel,
        place,
        additional
    } = organization;

    return {
        id,
        title,
        email,
        tel,
        place,
        additional
    }
}
