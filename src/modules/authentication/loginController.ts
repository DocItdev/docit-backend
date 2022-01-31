import {Request, Response } from 'express';
import StatusCodes from 'http-status-codes';

export default async function loginController(req: Request, res: Response) {
  try {
    return res.status(StatusCodes.OK).json({ message: "Login Successful" });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}