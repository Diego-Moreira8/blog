import { body } from "express-validator";
import { prisma } from "../../config/prisma-client.js";
import { comparePassword } from "../../config/bcrypt.js";
import { handleValidation } from "./handle-validation.js";

export const validateLoginForm = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Cannot be empty")
    .toLowerCase()
    .custom(async function checkExistence(username, { req }) {
      // Avoid unnecessary DB query
      if (!username) {
        return true;
      }

      const inputError = new Error("Username not found");

      try {
        const userFound = await prisma.user.findUnique({
          where: { username },
          include: { Profile: true },
        });

        if (!userFound) {
          throw inputError;
        }

        req.res.locals.user = userFound;

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
    .custom(async function checkPassword(password, { req }) {
      // Avoid unnecessary processing
      if (!req.body.username || typeof req.res.locals.user === "undefined") {
        return true;
      }

      const inputError = new Error("Wrong password");

      try {
        const passwordHash = req.res.locals.user.password;
        const passwordMatch = await comparePassword(password, passwordHash);

        if (!passwordMatch) {
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

  handleValidation,
];
