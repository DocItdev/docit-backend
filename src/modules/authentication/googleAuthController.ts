import {Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import { verifyGoogleCode } from 'src/services/authServices';
import { createUser, UserObject } from '../../services/userServices';
import jwt from 'jsonwebtoken';
import createJwtToken from 'src/middleware/createJwtToken';

export default async function googleAuthController(req: Request, res: Response) {
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
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}