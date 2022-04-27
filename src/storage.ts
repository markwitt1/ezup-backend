import multer from "multer";
import path from "path";
import { maxFileSize } from "./config";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

export const fileUpload = multer({
  storage: storage,
  limits: { fileSize: maxFileSize },
});
