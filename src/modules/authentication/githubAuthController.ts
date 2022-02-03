import {Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import { verifyGithubCode } from 'src/services/authServices';
import { createUser, UserObject } from '../../services/userServices';


export default async function githubAuthController(req: Request, res: Response) {
  try {
    const { body } = req;
    const code: string = body.code;
    const userInfo = await verifyGithubCode(code);

    const fullName = userInfo.user.name.split(" "); 
    const email = userInfo.userEmail;
    const userData:UserObject = { 
                      firstName: fullName[0],
                      lastName: fullName[1],
                      email
                    };
    const user = await createUser(userData);

    return res.status(StatusCodes.OK).json({ message: "Login Successful", user });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}