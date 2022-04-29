import { Router } from "express";
import User from "../../models/User";
import bcrypt from "bcrypt";
import generateAccessToken from "../../utils/generateToken";

const router = Router();

router.post("/", async (req: any, res) => {
  if (req.user) {
    return res.status(400).json({
      success: false,
      message: "User already logged in",
    });
  }

  if (req.body.username && req.body.password) {
    console.log(req.body);
    const dbUser = await User.findOne({
      username: req.body.username,
    }).exec();

    if (dbUser) {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        dbUser.hashedPassword
      );
      if (!isPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Invalid password",
        });
      }

      const token = generateAccessToken(dbUser.username);
      res.json({
        success: true,
        message: "User logged in",
        data: { token },
      });
    }
  }
});

export default router;
