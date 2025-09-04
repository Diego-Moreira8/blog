import { prisma } from "../../config/prisma-client.js";

export const register = async (req, res, next) => {
  // Prevent error when destructuring req.body
  if (typeof req.body === "undefined") {
    return res.status(400).json({ message: "Missing fields" });
  }

  const { name, username, password, passwordConfirmation } = req.body;

  if (
    typeof username === "undefined" ||
    typeof password === "undefined" ||
    typeof passwordConfirmation === "undefined"
  ) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    // Begins by checking if passwords match, to skip unnecessary DB queries
    if (password !== passwordConfirmation) {
      return res.status(401).json({ message: "Passwords don't match" });
    }

    const userTaken = await prisma.user.findUnique({ where: { username } });

    if (userTaken) {
      return res
        .status(401)
        .json({ message: "Username already exists in the database" });
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        password,
        Profile: { create: { name } },
      },
    });

    res.json({ message: "Success", newUser });
  } catch (error) {
    next(error);
  }
};
