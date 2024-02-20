import { body } from 'express-validator';
import { ErrorCodes } from '@Models';


export const loginSchema = [
    body('key')
        .exists()
        .withMessage({ code: ErrorCodes.AuthKeyRequired, message: 'Key is required' })
        .isString()
        .withMessage({ code: ErrorCodes.AuthKeyInvalid, message: 'Key is invalid' })
        .custom(value => !/\s/.test(value))
        .withMessage({ code: ErrorCodes.AuthKeyInvalid, message: 'Key is invalid' })
        .isLength({ min: 6, max: 60 })
        .withMessage({ code: ErrorCodes.AuthKeyLength, message: 'Key must contain from 6 to 60 characters' }),
    body('login')
        .exists()
        .withMessage({ code: ErrorCodes.AuthLoginRequired, message: 'Login is required' })
        .isString()
        .withMessage({ code: ErrorCodes.AuthLoginInvalid, message: 'Login is invalid' })
        .custom(value => !/\s/.test(value))
        .withMessage({ code: ErrorCodes.AuthLoginInvalid, message: 'Login is invalid' })
        .isLength({ min: 6, max: 40 })
        .withMessage({ code: ErrorCodes.AuthLoginLength, message: 'Login must contain from 6 to 40 characters' }),
    body('password')
        .exists()
        .withMessage({ code: ErrorCodes.AuthPasswordRequired, message: 'Password is required' })
        .isString()
        .withMessage({ code: ErrorCodes.AuthPasswordInvalid, message: 'Password is invalid' })
        .custom(value => !/\s/.test(value))
        .withMessage({ code: ErrorCodes.AuthPasswordInvalid, message: 'Password is invalid' })
        .isLength({ min: 6, max: 40 })
        .withMessage({ code: ErrorCodes.AuthPasswordLength, message: 'Password must contain from 6 to 40 characters' })
];
