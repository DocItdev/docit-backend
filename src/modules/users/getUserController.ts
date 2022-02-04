import {Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { findUser } from "src/services/userServices";

export default async function getUserController(req: Request, res: Response) {
  try {
    const { body } = req;
    const email: string = body.email;
    if (email) {
      const user = await findUser(email);
      return res.status(StatusCodes.OK).json(user.toJSON());
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Email is invalid or undefined" });
    }
  } catch(error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}