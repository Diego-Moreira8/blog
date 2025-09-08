import { body } from "express-validator";
import { prisma } from "../../config/prisma-client.js";
import { handleValidation } from "./handle-validation.js";

export const validateRegisterForm = [
  body("name")
    .trim()
    .isLength({ max: 250 })
    .withMessage("Maximum of 250 characters allowed"),

  body("username")
    .trim()
    .notEmpty()
    .withMessage("Cannot be empty")
    .toLowerCase()
    .isLength({ min: 3, max: 50 })
    .withMessage("Minimum of 3 and maximum of 50 characters are allowed")
    .matches(/^[A-Za-z0-9._-]+$/)
    .withMessage(
      "Username may only include letters, numbers, dots (.), underscores (_) and dashes (-). Spaces are not allowed."
    )
    .custom(async function isAvailable(username, { req }) {
      // Avoid unnecessary DB query
      if (!username) {
        return true;
      }

      const inputError = new Error("Username already exists in the database");

      try {
        const usernameTaken = await prisma.user.findFirst({
          where: {
            username: {
              equals: username,
              mode: "insensitive",
            },
          },
        });

        if (usernameTaken) {
          throw inputError;
        }

        return true;
      } catch (error) {
        if (error !== inputError) {
          req.res.locals.unexpectedValidationError = error;
        }

        throw inputError;
      }
    }),

  body("password")
    .notEmpty()
    .withMessage("Cannot be empty")
    .isLength({ min: 8, max: 250 })
    .withMessage("Minimum of 8 and maximum of 250 characters are allowed")
    .custom(function isEqualToUsername(password, { req }) {
      if (password === req.body.username) {
        throw new Error("Password cannot be equal to the username");
      }

      return true;
    })
    .matches(/^(?=.*[A-Za-z])(?=.*\d).+$/)
    .withMessage("Password must include at least one letter and one number"),

  body("password-confirmation")
    .notEmpty()
    .withMessage("Cannot be empty")
    .custom(function checkPasswordConfirmation(pwConfirmation, { req }) {
      if (req.body.password !== pwConfirmation) {
        throw new Error("Passwords don't match");
      }

      return true;
    }),

  handleValidation,
];
