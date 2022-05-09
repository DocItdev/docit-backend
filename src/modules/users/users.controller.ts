import {Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { createUser, deleteUserById, findUserByEmail } from "./users.service";
import { UserObject } from './users.interface';
import { pErr } from '../../shared/functions';


export async function createUserController(req:Request, res:Response) {
  try {
    const { body } = req;
    const user: UserObject = body;
    await createUser(user);
    return res.status(StatusCodes.OK).json({ message: "User Created" });
  } catch(error) {
    pErr(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}

export async function getUserController(req: Request, res: Response) {
  try {
    const email = String(req.params.email);
    if (email) {
      const user = await findUserByEmail(email);
      return res.status(StatusCodes.OK).json(user.toJSON());
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Email is invalid or undefined" });
    }
  } catch(error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}

export async function deleteUserController(req: Request, res: Response) {
  try {
    const userId = String(req.params.id);
    const successCode = await deleteUserById(userId);
    return res.status(StatusCodes.OK).json({ message: successCode});
  } catch(error) {
    pErr(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}
