import { Router } from "express";
import generateAccessToken from "../../utils/generateToken";
import User from "../../models/User";
import bcrypt from "bcrypt";
import { authenticateToken } from "../../utils/authenticateToken";
import deleteFile from "../../utils/deleteFile";

const router = Router();

router.get("/", authenticateToken, async (req: any, res) => {
  const dbUser = await User.findOne({
    _id: req.user._id,
  }).exec();
  console.log(dbUser);
  if (dbUser) {
    return res.json({
      success: true,
      message: "Got user's files",
      data: {
        uploads: dbUser.uploads,
      },
    });
  }
});

router.delete("/:name", authenticateToken, async (req: any, res) => {
  const dbUser = await User.findOne({
    _id: req.user._id,
  }).exec();
  if (dbUser) {
    const uploads = dbUser.uploads.filter(
      (upload: string) => upload !== req.params.name
    );

    if (uploads.length === dbUser.uploads.length) {
      return res.json({
        success: false,
        message: "File not found",
      });
    }
    try {
      await deleteFile(req.params.name);
    } catch (err) {
      return res.json({
        success: false,
        message: "couldn't delete file",
      });
    }
    await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          uploads,
        },
      }
    ).exec();
    return res.json({
      success: true,
      message: "Deleted file",
    });
  } else {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
});

export default router;
