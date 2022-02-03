import {Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import { verifyGoogleCode } from 'src/services/authServices';

export default async function googleAuthController(req: Request, res: Response) {
  try {
    const { body } = req;
    const token: string = body.token;
    const userInfo = await verifyGoogleCode(token);
    return res.status(StatusCodes.OK).json({ message: "Login Successful", userInfo });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}