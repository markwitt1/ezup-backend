import jwt from "jsonwebtoken";

export default function generateAccessToken(username: string) {
  console.log(process.env.SECRET);
  return jwt.sign(username, process.env.SECRET as string);
}
