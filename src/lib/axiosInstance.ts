import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.API_URL ?? 'http://localhost:8080';

export const AXIOS_INSTANCE = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const axiosInstance = async <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
    const { data } = await AXIOS_INSTANCE({
        ...config,
        ...options,
    });
    return data;
};

export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;
