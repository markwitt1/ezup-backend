import { access, unlink } from "fs/promises";
import { constants } from "fs";
import path from "path";
import { uploadDirectory } from "../config";

const deleteFile = async (fileName: string) => {
  const filePath = path.join(uploadDirectory, fileName);

  await access(filePath, constants.W_OK);
  await unlink(filePath);
};

export default deleteFile;
