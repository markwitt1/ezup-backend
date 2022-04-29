import path from "path";

export const maxFileSize =
  parseInt(process.env.MAX_FILE_SIZE as string) || 50 * 1024 * 1024;

export const maxFileCount =
  parseInt(process.env.MAX_FILE_COUNT as string) || 100;

export const uploadDirectory =
  process.env.UPLOAD_DIRECTORY || path.join(process.cwd(), "uploads");

export const port = process.env.PORT || 3001;
