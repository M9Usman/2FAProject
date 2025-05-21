import { RequestHandler } from 'express';
import { validationResult, ValidationError } from 'express-validator';

export const validate: RequestHandler = (req, res, next): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array({ onlyFirstError: true }).map((err) => {
      // Check if 'path' exists (narrow the type)
      const field = 'path' in err ? err.path : 'unknown_field';
      return {
        field,
        message: err.msg,
      };
    });

    res.status(422).json({ errors: formattedErrors });
    return;
  }

  next();
};
