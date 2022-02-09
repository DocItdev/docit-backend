import jwt from 'jsonwebtoken';

export default function createJwtToken(userId: string): string {
  return jwt.sign({ userId }, process.env.COOKIE_SECRET, {
    expiresIn: "10h",
  });
}