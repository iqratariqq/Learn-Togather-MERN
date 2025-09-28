import express from "express";
import {
  login,
  logout,
  Onboard,
  signup,
} from "../controller/controler.auth.js";
import { checkauth } from "../Middelware/checkauth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/onboarding", checkauth, Onboard);
router.get("/me", checkauth, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

export default router;
