import {Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { createUser, findUser } from "./users.service";
import { UserObject } from './users.interface';


export async function createUserController(req:Request, res:Response) {
  try {
    const { body } = req;
    const user: UserObject = body;
    await createUser(user);
    return res.status(StatusCodes.OK).json({ message: "User Created" });
  } catch(error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}

export async function getUserController(req: Request, res: Response) {
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
