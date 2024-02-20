import { AxiosMethod, RequestOptions, createInstance, sendRequest } from '@Helpers/apiHelpers';


const BASE_URL = 'auth';

type AuthRefreshResponse = {
    token: string;
}

export const authRefresh = async () => {
    const refreshInstance = createInstance();
    const url = `${BASE_URL}/refresh`;

    return refreshInstance.get<AuthRefreshResponse>(url);
}

export const authLogout = async () => {
    const url = `${BASE_URL}/logout`;

    return sendRequest(AxiosMethod.GET, url);
}

type AuthLoginResponse = {
    token: string;
}

export const authLogin = async (key: string, login: string, password: string) => {
    const url = `${BASE_URL}/login`;

    return sendRequest<AuthLoginResponse>(AxiosMethod.POST, url, { body: { key, login, password } });
}
