import bcrypt from "bcrypt";

export const hashPassword = (plaintextPassword) => {
  return bcrypt.hash(plaintextPassword, parseInt(process.env.SALT_ROUNDS));
};

export const comparePassword = (plaintextPassword, hash) => {
  return bcrypt.compare(plaintextPassword, hash);
};
