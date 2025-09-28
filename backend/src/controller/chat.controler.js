import { generateStreamToken } from "../utils/StreamUser.js";

export const getStreamToken = async (req, res) => {
  try {
    const token = generateStreamToken(req.userId);
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "stream token not found" });
    }
    res.status(200).json(token);
  } catch (error) {
    console.log("error in  chat controller", error);
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};
