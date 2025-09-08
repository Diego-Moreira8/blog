import { Router } from "express";
import { validateLoginForm } from "../middlewares/express-validator/validate-login-form.js";
import { validateRegisterForm } from "../middlewares/express-validator/validate-register-form.js";
import { login } from "../controllers/auth/login.js";
import { register } from "../controllers/auth/register.js";

export const authRouter = Router();

authRouter.post("/login", validateLoginForm, login);
authRouter.post("/register", validateRegisterForm, register);
