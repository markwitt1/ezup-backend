export const maxFileSize =
  parseInt(process.env.MAX_FILE_SIZE as string) || 50 * 1024 * 1024;

export const maxFileCount =
  parseInt(process.env.MAX_FILE_COUNT as string) || 100;

export const port = process.env.PORT || 3000;
