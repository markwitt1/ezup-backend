import express from "express";
import AdmZip from "adm-zip";
import uniqueId from "lodash/uniqueId";
import { flatMap } from "lodash";
import { uploadDirectory } from "../config";
import path from "path";
import mongoose from "mongoose";
import User from "../models/User";
import { verifyToken } from "../utils/authenticateToken";

const router = express.Router();

router.post("/", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      success: false,
      message: "No files were uploaded.",
    });
  }
  const zip = new AdmZip();
  const id = uniqueId();
  const outPath = path.join(uploadDirectory, `${id}.zip`);

  for (const file of flatMap(Object.values(req.files))) {
    zip.addFile(file.name, file.data);
  }
  zip.writeZip(outPath, async (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error writing zip file",
      });
    }

    let user = undefined;
    if (req.headers.authorization) {
      try {
        user = await verifyToken(req.headers.authorization.split(" ")[1]);
      } catch (err) {}
      if (user) {
        console.log(user);
        console.log(`${id}.zip`);
        const updated = await User.findOneAndUpdate(
          { _id: user._id },
          {
            $push: {
              uploads: `${id}.zip`,
            },
          }
        ).exec();
        console.log(updated);
      }
    }

    res.json({
      success: true,
      message: "Files uploaded successfully.",
      data: {
        id,
        addedToUser: !!user,
      },
    });
  });
});

export default router;
