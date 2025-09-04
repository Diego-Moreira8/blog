import jwt from "jsonwebtoken";
import { prisma } from "../../config/prisma-client.js";
import { comparePassword } from "../../config/bcrypt.js";

export const login = async (req, res, next) => {
  // Prevent error when destructuring req.body
  if (typeof req.body === "undefined") {
    return res.status(400).json({ message: "Missing fields" });
  }

  const { username, password } = req.body;

  if (typeof username === "undefined" || typeof password === "undefined") {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.json({ message: "Success", token: `Bearer ${token}` });
  } catch (error) {
    next(error);
  }
};
