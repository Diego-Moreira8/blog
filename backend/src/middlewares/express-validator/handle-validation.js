import { validationResult } from "express-validator";

export function handleValidation(req, res, next) {
  if (res.locals.unexpectedValidationError) {
    return next(res.locals.unexpectedValidationError);
  }

  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Invalid form fields", formErrors: result.array() });
  }

  next();
}
