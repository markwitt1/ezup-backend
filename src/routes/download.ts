import express from "express";
import { access, constants } from "fs";
import { uploadDirectory } from "../config";

const router = express.Router();

router.get("/", (req, res) =>
  res.status(400).json({ success: false, message: "Please provide an ID" })
);

router.get("/:id", async (req, res) => {
  if (isNaN(parseInt(req.params.id))) {
    return res.status(400).json({
      success: false,
      message: "ID must be a number.",
    });
  }

  access(`${uploadDirectory}/${req.params.id}.zip`, constants.R_OK, (err) => {
    if (err) {
      return res.status(404).json({
        success: false,
        message: `No zip file found for id ${req.params.id}`,
      });
    }

    res.sendFile(`${uploadDirectory}/${req.params.id}.zip`);
  });
});

export default router;
