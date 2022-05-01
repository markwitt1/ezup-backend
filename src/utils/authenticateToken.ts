const jwt = require("jsonwebtoken");
import { NextFunction, Response } from "express";

export async function authenticateToken(
  req: any,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  try {
    const user = await verifyToken(token);
    req.user = user;
    next();
  } catch {
    return res.sendStatus(403);
  }
}

export const verifyToken = (token: string) =>
  jwt.verify(token, process.env.SECRET as string, (err: any, user: any) => {
    if (err) throw err;

    return user;
  });
