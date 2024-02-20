import { ErrorCodes } from '@Models';
import { CustomError, CustomErrorContent } from './CustomError';


export type ForbiddenErrorParams = {
    errors?: CustomErrorContent[];
    logging?: boolean;
}

export class ForbiddenError extends CustomError {
    private readonly _statusCode = 403;
    private readonly _logging: boolean;
    private readonly _errors: CustomErrorContent[];

    constructor(params?: ForbiddenErrorParams) {
        super();

        const { errors, logging } = params || {};

        this._logging = logging || false;
        this._errors = errors || [{ code: ErrorCodes.Forbidden, message: 'Forbidden' }];
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
