"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequiredFields = exports.validateRequest = exports.validate = void 0;
const zod_1 = require("zod");
const error_middleware_1 = require("./error.middleware");
/**
 * Generic validation middleware factory
 * @param schema - Zod schema to validate against
 * @param source - Where to get data from (body, query, params)
 */
const validate = (schema, source = 'body') => {
    return (req, res, next) => {
        try {
            const data = req[source];
            const validatedData = schema.parse(data);
            // Replace the request data with validated data
            req[source] = validatedData;
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                // Handle Zod validation errors
                const zodError = error;
                const errorMessages = zodError.errors?.map((err) => err.message) || ['Validation failed'];
                next(new error_middleware_1.AppError(`Validation failed: ${errorMessages.join(', ')}`, 400));
            }
            else {
                next(new error_middleware_1.AppError('Validation failed', 400));
            }
        }
    };
};
exports.validate = validate;
/**
 * Request validation middleware that validates multiple sources
 */
const validateRequest = (schemas) => {
    return (req, res, next) => {
        try {
            if (schemas.body) {
                req.body = schemas.body.parse(req.body);
            }
            if (schemas.query) {
                req.query = schemas.query.parse(req.query);
            }
            if (schemas.params) {
                req.params = schemas.params.parse(req.params);
            }
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                // Handle Zod validation errors
                const zodError = error;
                const errorMessages = zodError.errors?.map((err) => {
                    const path = err.path?.join('.') || 'unknown';
                    return `${path}: ${err.message}`;
                }) || ['Validation failed'];
                const errorMessage = `Validation failed: ${errorMessages.join(', ')}`;
                next(new error_middleware_1.AppError(errorMessage, 400));
            }
            else {
                next(new error_middleware_1.AppError('Validation failed', 400));
            }
        }
    };
};
exports.validateRequest = validateRequest;
/**
 * Middleware to validate that required fields are present
 */
const validateRequiredFields = (fields, source = 'body') => {
    return (req, res, next) => {
        const data = req[source];
        const missingFields = [];
        for (const field of fields) {
            if (data[field] === undefined || data[field] === null || data[field] === '') {
                missingFields.push(field);
            }
        }
        if (missingFields.length > 0) {
            return next(new error_middleware_1.AppError(`Missing required fields: ${missingFields.join(', ')}`, 400));
        }
        next();
    };
};
exports.validateRequiredFields = validateRequiredFields;
//# sourceMappingURL=validation.middleware.js.map