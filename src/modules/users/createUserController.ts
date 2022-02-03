import {Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { createUser, UserObject } from "src/services/userServices";


export default async function createUserController(req:Request, res:Response) {
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