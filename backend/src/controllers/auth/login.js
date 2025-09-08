import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);

    res.json({ message: "Success", token: `Bearer ${token}` });
  } catch (error) {
    next(error);
  }
};
