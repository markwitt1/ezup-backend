import { Router } from "express";
import generateAccessToken from "../../utils/generateToken";
import User from "../../models/User";
import bcrypt from "bcrypt";

import createUserRoute from "./createUser";
import loginRoute from "./login";
import myUploadsRoute from "./myUploads";

const router = Router();

router.use("/createUser", createUserRoute);
router.use("/login", loginRoute);
router.use("/myUploads", myUploadsRoute);

export default router;
