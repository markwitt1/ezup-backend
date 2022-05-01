import jwt from "jsonwebtoken";

export default function generateAccessToken(user: object) {
  return jwt.sign(JSON.stringify(user), process.env.SECRET as string);
}
