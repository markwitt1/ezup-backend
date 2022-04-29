import { Router } from "express";
import generateAccessToken from "../../utils/generateToken";
import User from "../../models/User";
import bcrypt from "bcrypt";

const router = Router();

router.post("/", async (req: any, res) => {
  if (req.user) {
    return res.status(400).json({
      success: false,
      message: "User already logged in",
    });
  }

  if (req.body.username && req.body.password) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const dbUser = await new User({
      username: req.body.username,
      hashedPassword,
    }).save();

    if (dbUser) {
      console.log(dbUser);
      const token = generateAccessToken(dbUser.username);
      res.json({
        success: true,
        message: "User created",
        data: { token },
      });
    }
  }
});

export default router;