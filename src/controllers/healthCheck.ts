import {Request, Response } from 'express';
import StatusCodes from 'http-status-codes';


export default function healthCheck(req: Request, res: Response) {
  return res.status(StatusCodes.OK).json({ message: "Working correctly" });
}