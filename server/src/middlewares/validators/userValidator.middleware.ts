import { body } from 'express-validator';
import { ErrorCodes } from '@Models';


export const createUserSchema = [
    body('login')
        .exists()
        .withMessage({ code: ErrorCodes.UserLoginRequired, message: 'Login is required' })
        .isString()
        .withMessage({ code: ErrorCodes.UserLoginInvalid, message: 'Login is invalid' })
        .custom(value => !/\s/.test(value))
        .withMessage({ code: ErrorCodes.UserLoginInvalid, message: 'Login is invalid' })
        .isLength({ min: 6, max: 40 })
        .withMessage({ code: ErrorCodes.UserLoginLength, message: 'Login must contain from 6 to 40 characters' }),
    body('password')
        .exists()
        .withMessage({ code: ErrorCodes.UserPasswordRequired, message: 'Password is required' })
        .isString()
        .withMessage({ code: ErrorCodes.UserPasswordInvalid, message: 'Password is invalid' })
        .custom(value => !/\s/.test(value))
        .withMessage({ code: ErrorCodes.UserPasswordInvalid, message: 'Password is invalid' })
        .isLength({ min: 6, max: 40 })
        .withMessage({ code: ErrorCodes.UserPasswordLength, message: 'Password must contain from 6 to 40 characters' }),
    body('roleId')
        .exists()
        .withMessage({ code: ErrorCodes.UserRoleIdRequired, message: 'Role ID is required' })
        .isNumeric()
        .withMessage({ code: ErrorCodes.UserRoleIdInvalid, message: 'Role ID is invalid' }),
    body('name')
        .exists()
        .withMessage({ code: ErrorCodes.UserNameRequired, message: 'Name is required' })
        .isString()
        .withMessage({ code: ErrorCodes.UserNameInvalid, message: 'Name is invalid' })
        .isLength({ min: 2, max: 40 })
        .withMessage({ code: ErrorCodes.UserNameLength, message: 'Name must contain from 2 to 40 characters' }),
    body('surname')
        .exists()
        .withMessage({ code: ErrorCodes.UserSurnameRequired, message: 'Surname is required' })
        .isString()
        .withMessage({ code: ErrorCodes.UserSurnameInvalid, message: 'Surname is invalid' })
        .isLength({ min: 2, max: 40 })
        .withMessage({ code: ErrorCodes.UserSurnameLength, message: 'Surname must contain from 2 to 40 characters' }),
    body('patronymic')
        .optional()
        .isString()
        .withMessage({ code: ErrorCodes.UserPatronymicInvalid, message: 'Patronymic is invalid' })
        .isLength({ min: 2, max: 40 })
        .withMessage({ code: ErrorCodes.UserPatronymicLength, message: 'Patronymic must contain from 2 to 40 characters' }),
    body('email')
        .optional()
        .isEmail()
        .withMessage({ code: ErrorCodes.UserEmailInvalid, message: 'Email is invalid' }),
    body('tel')
        .optional()
        .isString()
        .withMessage({ code: ErrorCodes.UserTelInvalid, message: 'Tel is invalid' })
        .isLength({ min: 6, max: 30 })
        .withMessage({ code: ErrorCodes.UserTelLength, message: 'Tel must contain from 6 to 30 characters' }),
    body('additional')
        .optional()
        .isString()
        .withMessage({ code: ErrorCodes.UserAdditionalInvalid, message: 'Additional info is invalid' })
        .isLength({ min: 6, max: 500 })
        .withMessage({ code: ErrorCodes.UserAdditionalLength, message: 'Additional info must contain from 6 to 500 characters' }),
];
