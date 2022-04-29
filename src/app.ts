import express, { Application, Request, Response } from "express";
import fileUpload from "express-fileupload";
import path from "path";
import dotenv from "dotenv";

import uploadRoute from "./routes/upload";
import downloadRoute from "./routes/download";
import loginRoute from "./routes/users/login";
import createUserRoute from "./routes/users/createUser";

import { port } from "./config";
import mongoose from "mongoose";

dotenv.config();

if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI, {});
} else {
  console.error("No MONGO_URI found in .env file");
}

const app = express();

app.use(express.json());
app.use(fileUpload());

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use("/login", loginRoute);
app.use("/upload", uploadRoute);
app.use("/download", downloadRoute);
app.use("/createUser", createUserRoute);

app.listen(port, function () {
  console.log(`EZUP Server is listening on port ${port}`);
});
