import { CustomErrorContent } from '@Errors';
import { Result, ValidationError } from 'express-validator';

class ValidationService {
    public parseValidationResult(result: Result<ValidationError>): CustomErrorContent[] {
        return result.array({ onlyFirstError: true }).map(error => ({
            code: error.msg?.code,
            message: error.msg?.message
        }));
    }

    public isString(value: unknown) {
        if (typeof value !== 'string') return false;

        return true;
    }

    public isNumber(value: unknown) {
        return typeof value === 'number' && !Number.isNaN(value);
    }

    public isEmail(email: unknown) {
        if (!this.isString(email)) return false;

        const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!(email as string).toLowerCase().match(emailRegEx)) {
            return false;
        }

        return true;
    }

    public minLength(value: unknown, length: number) {
        if (!this.isString(value)) return false;

        if ((value as string).length < length) return false;

        return true;
    }

    public maxLength(value: unknown, length: number) {
        if (!this.isString(value)) return false;

        if ((value as string).length > length) return false;

        return true;
    }
}

export const validationService = new ValidationService();
