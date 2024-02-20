import { ErrorCodes } from '@Models';
import { CustomError, CustomErrorContent } from './CustomError';


export type NotFoundErrorParams = {
    errors?: CustomErrorContent[];
    logging?: boolean;
}

export class NotFoundError extends CustomError {
    private readonly _statusCode = 404;
    private readonly _logging: boolean;
    private readonly _errors: CustomErrorContent[];

    constructor(params?: NotFoundErrorParams) {
        super();

        const { errors, logging } = params || {};

        this._logging = logging || false;
        this._errors = errors || [{ code: ErrorCodes.NotFound, message: 'Not Found' }];
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
