import {Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import { verifyGoogleCode } from '../../services/authServices';
import { createUser, UserObject } from '../../services/userServices';
import createJwtToken, { cookieConfig } from '../../middleware/createJwtToken';

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
    return res.status(StatusCodes.OK).cookie('user_token', token, cookieConfig)
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}