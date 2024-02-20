import { ErrorCodes } from '@Models';
import { CustomError, CustomErrorContent } from './CustomError';


export type BadRequestErrorParams = {
    errors?: CustomErrorContent[];
    logging?: boolean;
}

export class BadRequestError extends CustomError {
    private readonly _statusCode = 400;
    private readonly _logging: boolean;
    private readonly _errors: CustomErrorContent[];

    constructor(params?: BadRequestErrorParams) {
        super();

        const { errors, logging } = params || {};

        this._logging = logging || false;
        this._errors = errors || [{ code: ErrorCodes.BadRequest, message: 'Bad Request' }];
    }

    get errors() {
        return this._errors;
    }

    get statusCode() {
        return this._statusCode;
    }

    get logging() {
        return this._logging;
    }
}
