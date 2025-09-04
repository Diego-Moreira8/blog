import { prisma } from "../../config/prisma-client.js";
import jwt from "jsonwebtoken";

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

    if (user.password !== password) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.json({ message: "Success", token: `Bearer ${token}` });
  } catch (error) {
    next(error);
  }
};
