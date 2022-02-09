import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { findUserById } from '../services/userServices';

export default async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const token: string = req.cookies.user_token;
    if (!token) {
      return res.sendStatus(StatusCodes.FORBIDDEN);
    }
    const data: any = jwt.verify(token, process.env.COOKIE_SECRET);
    const userId: string = data.userId;
    const user = await findUserById(userId);
    if (user) {
      req.user = { id: userId };
      return next();
    } else {
      return res.status(StatusCodes.FORBIDDEN);
    }
  } catch {
    return res.sendStatus(StatusCodes.FORBIDDEN);
  }
}