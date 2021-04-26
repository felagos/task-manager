export interface ResponseApi<T> {
    statusCode: number;
    data?: T;
    message?: string;
}