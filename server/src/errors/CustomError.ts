import { ErrorCodes } from "@Models";


export type CustomErrorContent = {
    code?: ErrorCodes;
    message?: string;
};

export abstract class CustomError extends Error {
    abstract readonly statusCode: number;
    abstract readonly errors: CustomErrorContent[];
    abstract readonly logging: boolean;
}
