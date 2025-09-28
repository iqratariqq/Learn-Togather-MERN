import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../model/User.js";

export const checkauth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    // console.log("user in chcekauth", token);
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "UnAuthurized, token not found " });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("user is decoded in checkauth", decode);
    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "UnAuthurized, Invelid Token or token hase been expired ",
      });
    }
    // console.log("user id in checkauth", decode.userId);
    req.userId = decode.userId;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "UnAuthurized, Invelid userID ",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("invalid token,  Unauthorized", error);
    res
      .status(401)
      .json({ success: false, message: "invalid token,  Unauthorized" });
  }
};
