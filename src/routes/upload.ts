import express from "express";
import AdmZip from "adm-zip";
import uniqueId from "lodash/uniqueId";
import { flatMap } from "lodash";
import { uploadDirectory } from "../config";

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
  const outPath = `${uploadDirectory}/${id}.zip`;

  for (const file of flatMap(Object.values(req.files))) {
    zip.addFile(file.name, file.data);
  }
  zip.writeZip(outPath, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error writing zip file",
      });
    }

    res.json({
      success: true,
      message: "Files uploaded successfully.",
      data: {
        id,
      },
    });
  });
});

export default router;
