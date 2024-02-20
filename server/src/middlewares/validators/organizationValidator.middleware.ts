import { ErrorCodes } from '@Models';
import { body } from 'express-validator';


export const createOrganizationSchema = [
    body('title')
        .exists()
        .withMessage({ code: ErrorCodes.OrgTitleRequired, message: 'Title is required' })
        .isString()
        .withMessage({ code: ErrorCodes.OrgTitleInvalid, message: 'Title is invalid' })
        .isLength({ min: 5, max: 250 })
        .withMessage({ code: ErrorCodes.OrgTitleLength, message: 'Title must contain from 5 to 250 characters' }),
    body('email')
        .optional()
        .isEmail()
        .withMessage({ code: ErrorCodes.OrgEmailInvalid, message: 'Email is invalid' }),
    body('tel')
        .optional()
        .isString()
        .withMessage({ code: ErrorCodes.OrgTelInvalid, message: 'Tel is invalid' })
        .isLength({ min: 6, max: 30 })
        .withMessage({ code: ErrorCodes.OrgTelLength, message: 'Tel must contain from 6 to 30 characters' }),
    body('place')
        .optional()
        .isString()
        .withMessage({ code: ErrorCodes.OrgPlaceInvalid, message: 'Place is invalid' })
        .isLength({ min: 6, max: 250 })
        .withMessage({ code: ErrorCodes.OrgPlaceLength, message: 'Place must contain from 6 to 250 characters' }),
    body('additional')
        .optional()
        .isString()
        .withMessage({ code: ErrorCodes.OrgAdditionalInvalid, message: 'Additional info is invalid' })
        .isLength({ min: 6, max: 1000 })
        .withMessage({ code: ErrorCodes.OrgAdditionalLength, message: 'Additional info must contain from 6 to 1000 characters' }),
];

export const updateOrganizationSchema = [
    body('id')
        .exists()
        .withMessage({ code: ErrorCodes.OrgIdRequired, message: 'Id is required' })
        .isNumeric()
        .withMessage({ code: ErrorCodes.OrgIdInvalid, message: 'Id is invalid' }),
    body('title')
        .exists()
        .withMessage({ code: ErrorCodes.OrgTitleRequired, message: 'Title is required' })
        .isString()
        .withMessage({ code: ErrorCodes.OrgTitleInvalid, message: 'Title is invalid' })
        .isLength({ min: 5, max: 250 })
        .withMessage({ code: ErrorCodes.OrgTitleLength, message: 'Title must contain from 6 to 250 characters' }),
    body('email')
        .optional()
        .isEmail()
        .withMessage({ code: ErrorCodes.OrgEmailInvalid, message: 'Email is invalid' }),
    body('tel')
        .optional()
        .isString()
        .withMessage({ code: ErrorCodes.OrgTelInvalid, message: 'Tel is invalid' })
        .isLength({ min: 6, max: 30 })
        .withMessage({ code: ErrorCodes.OrgTelLength, message: 'Tel must contain from 6 to 30 characters' }),
    body('place')
        .optional()
        .isString()
        .withMessage({ code: ErrorCodes.OrgPlaceInvalid, message: 'Place is invalid' })
        .isLength({ min: 6, max: 250 })
        .withMessage({ code: ErrorCodes.OrgPlaceLength, message: 'Place must contain from 6 to 250 characters' }),
    body('additional')
        .optional()
        .isString()
        .withMessage({ code: ErrorCodes.OrgAdditionalInvalid, message: 'Additional info is invalid' })
        .isLength({ min: 6, max: 1000 })
        .withMessage({ code: ErrorCodes.OrgAdditionalLength, message: 'Additional info must contain from 6 to 1000 characters' }),
];
