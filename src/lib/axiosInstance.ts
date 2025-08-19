import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { toast } from 'sonner';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://cdc-backend-image-806223186172.asia-southeast2.run.app';

export const AXIOS_INSTANCE = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

AXIOS_INSTANCE.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 403) {
            toast.error('Access denied. Please check your permissions.');
        }
        return Promise.reject(error);
    }
);

export const axiosInstance = async <T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig
): Promise<T> => {
    try {
        const { data } = await AXIOS_INSTANCE({
            ...config,
            ...options,
        });
        return data;
    } catch (error) {
        //console.error("API Call Failed:", error);
        if (axios.isAxiosError(error) && error.code === 'ERR_NETWORK') {
            toast.error('Network error or CORS issue. Please check your backend configuration and URL.');
        } else {
            toast.error('Request failed. Please try again.');
        }

        throw error;
    }
};

export type ErrorType<Error> = AxiosError<Error>;
export type BodyType<BodyData> = BodyData;