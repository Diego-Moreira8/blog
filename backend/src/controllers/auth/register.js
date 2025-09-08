import { prisma } from "../../config/prisma-client.js";
import { hashPassword } from "../../config/bcrypt.js";

export const register = async (req, res, next) => {
  try {
    const { name, username, password } = req.body;
    const passwordHash = await hashPassword(password);

    await prisma.user.create({
      data: {
        username,
        password: passwordHash,
        Profile: { create: { name: name || null } },
      },
    });

    res.json({ message: "Success" });
  } catch (error) {
    next(error);
  }
};
