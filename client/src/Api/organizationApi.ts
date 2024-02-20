import { AxiosMethod, RequestOptions, sendRequest } from '@Helpers/apiHelpers';


type OrganizationGetResponse = {
    token: string;
}

export const organizationGet = async (id: number, requestOptions?: RequestOptions) => {
    const url = 'organization';
    return sendRequest<OrganizationGetResponse>(AxiosMethod.GET, url, { ...requestOptions, config: { params: { id } } });
}