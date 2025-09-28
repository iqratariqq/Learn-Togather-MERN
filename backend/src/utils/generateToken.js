import jwt from "jsonwebtoken";

export const generateTokenandSetCookies = (res, userId) => {
  const Token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", Token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false, // local pe false rakho
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return Token;
};
