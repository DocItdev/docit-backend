import { CookieOptions } from 'express';
import jwt from 'jsonwebtoken';

export default function createJwtToken(userId: string): string {
  return jwt.sign({ userId }, process.env.COOKIE_SECRET, {
    expiresIn: "1m",
  });
}

export const cookieConfig: CookieOptions = {
  httpOnly: true,
  maxAge: 60000 * 2, // 2m
  secure: process.env.NODE_ENV === 'production'
}