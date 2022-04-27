import express, { Application, Request, Response } from "express";
import { port } from "./config";
import fileUpload from "express-fileupload";

import uploadRoute from "./routes/upload";
import downloadRoute from "./routes/download";

const app = express();

app.use(fileUpload());

app.use("/upload", uploadRoute);
app.use("/download", downloadRoute);

app.listen(port, function () {
  console.log(`EZUP Server is listening on port ${port}`);
});
