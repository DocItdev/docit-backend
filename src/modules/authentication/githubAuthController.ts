import {Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import { verifyGithubCode } from 'src/services/authServices';

export default async function githubAuthController(req: Request, res: Response) {
  try {
    const { body } = req;
    const code: string = body.code;
    const user = await verifyGithubCode(code);
    return res.status(StatusCodes.OK).json({ message: "Login Successful", user });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}