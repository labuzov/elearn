import { ErrorCodes } from '@Models';
import { CustomError, CustomErrorContent } from './CustomError';


export type UnauthorizedErrorParams = {
    errors?: CustomErrorContent[];
    logging?: boolean;
}

export class UnauthorizedError extends CustomError {
    private readonly _statusCode = 401;
    private readonly _logging: boolean;
    private readonly _errors: CustomErrorContent[];

    constructor(params?: UnauthorizedErrorParams) {
        super();

        const { errors, logging } = params || {};

        this._logging = logging || false;
        this._errors = errors || [{ code: ErrorCodes.Unauthorized, message: 'Unauthorized' }];
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
