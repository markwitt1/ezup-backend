import jwt from "jsonwebtoken";

export default function generateAccessToken(user: object) {
  console.log(process.env.SECRET);
  return jwt.sign(JSON.stringify(user), process.env.SECRET as string);
}
