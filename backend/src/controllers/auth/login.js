import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
  try {
    const user = res.locals.user;
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.json({
      message: "Success",
      user: {
        token: `Bearer ${token}`,
        username: user.username,
        name: user.Profile.name,
        uiColor: user.Profile.uiColor,
        uiFont: user.Profile.uiFont,
      },
    });
  } catch (error) {
    next(error);
  }
};
