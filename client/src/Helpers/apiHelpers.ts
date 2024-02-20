import axios, { AxiosError, AxiosPromise, AxiosRequestConfig, CreateAxiosDefaults } from 'axios';
import { useAuthStore } from '@Stores/AuthStore';
import { showError } from './notificationHelpers';

const BASE_URL = 'http://localhost:5000/api';
// const API_HEADERS = {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//     'Access-Control-Allow-Credentials': 'true'
// };

type ErrorResponseData = {
    errors?: {
        code?: number;
        message?: string;
    }[]
}

export type RequestOptions<TBody = unknown> = {
    config?: AxiosRequestConfig;
    body?: TBody;
}

export enum AxiosMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    OPTIONS = 'OPTIONS'
}

export const createInstance = (config?: CreateAxiosDefaults) => axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
    // headers: API_HEADERS
    ...config
});

const instance = createInstance();

instance.interceptors.request.use(config => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

instance.interceptors.response.use(config => config, async (error: AxiosError & { config: { _isRetry?: boolean }}) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._isRetry) {
        originalRequest._isRetry = true;

        try {
            await useAuthStore.getState().refresh();

            return instance.request(originalRequest);
        } catch {
            alert('Не авторизованы')
            useAuthStore.getState().clear();
        }
    }
    
    throw error;
})

function methodChooser(method: AxiosMethod) {
    switch (method) {
        case AxiosMethod.GET:
            return instance.get;
        case AxiosMethod.POST:
            return instance.post;
        case AxiosMethod.PUT:
            return instance.put;
        case AxiosMethod.DELETE:
            return instance.delete;
        default:
            return instance.get;
    }
}

function handleError(error: AxiosError<ErrorResponseData>) {
    const { response } = error;

    if (!response || response?.status === 401) return;

    if (response.data?.errors.length) {
        const errorText = response.data.errors[0]?.message;
        showError(errorText);
    }
}

function callMethod<TResponse, TBody>(method: AxiosMethod, url: string, requestOptions?: RequestOptions<TBody>): AxiosPromise<TResponse> {
    const result = (method === AxiosMethod.POST || method === AxiosMethod.PUT)
        ? methodChooser(method)(url, requestOptions?.body, requestOptions?.config)
        : methodChooser(method)(url, requestOptions?.config);

    result.catch((error: AxiosError<ErrorResponseData>) => {
        handleError(error);
    });

    return result;
}

function getTypedData<TResponse, TBody>(url: string, requestOptions?: RequestOptions<TBody>): AxiosPromise<TResponse> {
    return callMethod<TResponse, TBody>(AxiosMethod.GET, url, requestOptions);
}

function postTypedData<TResponse, TBody>(url: string, requestOptions?: RequestOptions<TBody>): AxiosPromise<TResponse> {
    return callMethod<TResponse, TBody>(AxiosMethod.POST, url, requestOptions);
}

function putTypedData<TResponse, TBody>(url: string, requestOptions?: RequestOptions<TBody>): AxiosPromise<TResponse> {
    return callMethod<TResponse, TBody>(AxiosMethod.PUT, url, requestOptions);
}

function deleteData<TResponse, TBody>(url: string, requestOptions?: RequestOptions<TBody>): AxiosPromise<TResponse> {
    return callMethod<TResponse, TBody>(AxiosMethod.DELETE, url, requestOptions);
}

export function sendRequest<TResponse, TBody = any>(method: AxiosMethod, url: string, requestOptions?: RequestOptions<TBody>): AxiosPromise<TResponse> {
    switch (method) {
        case AxiosMethod.GET:
            return getTypedData<TResponse, TBody>(url, requestOptions);
        case AxiosMethod.POST:
            return postTypedData<TResponse, TBody>(url, requestOptions);
        case AxiosMethod.PUT:
            return putTypedData<TResponse, TBody>(url, requestOptions);
        case AxiosMethod.DELETE:
            return deleteData<TResponse, TBody>(url, requestOptions);
        default:
            return Promise.reject();
    }
}
