import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (user, res) => {
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("jwt", token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true, // prevents (XSS) cross-site scripting attacks by preventing client-side scripts from accessing the cookie
    sameSite: "strict", // prevents (CSRF) cross-site request forgery attacks by only allowing the cookie to be sent in requests from the same site
    secure: process.env.NODE_ENV !== "development", // ensures that the cookie is only sent over HTTPS connections
  });

  return token;
};
