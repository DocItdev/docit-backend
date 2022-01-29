import { Request, Response, NextFunction, } from 'express';
import { StatusCodes } from 'http-status-codes';


export default function verifyUser(req: Request, res: Response, next: NextFunction) {
  if(req.isAuthenticated()) {
    next();
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "User is not authenticated" })
  }
}