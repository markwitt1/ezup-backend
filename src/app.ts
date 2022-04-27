import express, { Application, Request, Response } from "express";
import { port } from "./config";
import fileUpload from "express-fileupload";
import AdmZip from "adm-zip";
import uniqueId from "lodash/uniqueId";
import { flatMap } from "lodash";

const app = express();

app.use(fileUpload());

app.post("/upload", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      success: false,
      message: "No files were uploaded.",
    });
  }
  const zip = new AdmZip();
  const id = uniqueId();
  const outPath = `${__dirname}/uploads/${id}.zip`;

  for (const file of flatMap(Object.values(req.files))) {
    zip.addFile(file.name, file.data);
  }
  zip.writeZip(outPath);

  res.json({
    success: true,
    message: "Files uploaded successfully.",
    data: {
      id,
    },
  });
});

app.listen(port, function () {
  console.log(`EZUP Server is listening on port ${port}`);
});
