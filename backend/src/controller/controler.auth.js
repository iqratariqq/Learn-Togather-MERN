import bycryptjs from "bcryptjs";
import { User } from "../model/User.js";
import { generateTokenandSetCookies } from "../utils/generateToken.js";
import { streamUpsertUser } from "../utils/StreamUser.js";

export const signup = async (req, res) => {
  const { email, fullName, password } = req.body;
  // console.log(req.body)
  try {
      // console.log(password,fullName,email)
    if (!password || !fullName || !email) {
      throw new Error("All fiels are required");
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "password must be at lesat 6 character long",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "invalid email",
      });
    }

    const userAlreadyexist = await User.findOne({ email });
    if (userAlreadyexist) {
      return res
        .status(400)
        .json({ success: false, message: "email already registered" });
    }
    const hashPassword = await bycryptjs.hash(password, 6);
    const indx = Math.floor(Math.random() * 100) + 1;
    const avatar = `https://avatar.iran.liara.run/public/${indx}.png`;

    const user = new User({
      email,
      fullName: fullName,
      password: hashPassword,
      profilePic: avatar,
    });
    await user.save();
    try {
      await streamUpsertUser({
        id: user._id.toString(),
        name: user.fullName,
        image: user.profilePic || "",
      });

      // console.log("user in streamuperuser");
    } catch (error) {
      console.error(`error in creating stream user ${user.fullName}`);
    }
    generateTokenandSetCookies(res, user._id);
    return res.status(201).json({
      success: true,
      message: "user Created succussfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in signup",error)
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  // console.log("user in login");
  const { email, password } = req.body;

  try {
    if (!password || !email) {
      throw new Error("All fiels are required");
    }
    const userByemail = await User.findOne({ email });
    if (!userByemail) {
      return res.status(400).json({ success: false, message: "invalid email" });
    }
    const userbyPassword = await bycryptjs.compare(
      password,
      userByemail.password
    );
    if (!userbyPassword) {
      return res
        .status(400)
        .json({ success: false, message: "invalid password" });
    }
    generateTokenandSetCookies(res, userByemail._id);
    res.status(200).json({
      success: true,
      message: "login successfully",
      user: {
        ...userByemail._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("login in catch");
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
    res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.status(200).json({
    success: true,
    message: "user logout successfully",
  });
};

export const Onboard = async (req, res) => {
  const { bio, nativeLanguage, learningLanguage, location,profilePic } = req.body;
  if (!bio || !nativeLanguage || !learningLanguage || !location) {
    return res
      .status(400)
      .json({ success: false, message: "all fields are required" });
  }
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not found,invalid user Id" });
    }
    user.bio = bio;
    user.nativeLanguage = nativeLanguage;
    user.learningLanguage = learningLanguage;
    user.location = location;
    user.profilePic = profilePic;
    user.isOnboardered=true
    await user.save();
    return res.status(201).json({
      success: true,
      message: "user created on board succussfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "internal server error",
      error: error.message,
    });
  }
};
