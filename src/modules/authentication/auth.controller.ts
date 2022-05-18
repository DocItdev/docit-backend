import {Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import { verifyGithubCode, verifyGoogleCode, createJwtToken } from './auth.service';
import { createUser } from '../users/users.service';
import { UserObject } from '../users/users.interface';
import { pErr } from '../../shared/functions';

export async function githubAuthController(req: Request, res: Response) {
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
    const token = createJwtToken(user.id)
    return res.status(StatusCodes.OK).json({ token, user });
  } catch (error) {
    console.log(error);
    pErr(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}

export async function googleAuthController(req: Request, res: Response) {
  try {
    const { body } = req;
    const token: string = body.token;
    const userInfo = await verifyGoogleCode(token);

    const userData:UserObject = { 
      firstName: userInfo.given_name,
      lastName: userInfo.family_name,
      email: userInfo.email
    };
    const user = await createUser(userData);
    const jwtToken = createJwtToken(user.id)
    return res.status(StatusCodes.OK).json({ token: jwtToken, user });
  } catch (error) {
    pErr(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}
