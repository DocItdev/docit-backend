/* eslint-disable max-len */
import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import { verifyGithubCode, verifyGoogleCode, createJwtToken, createRefreshJwtToken } from './auth.service';
import { createUser } from '../users/users.service';
import { UserObject } from '../users/users.interface';
import { pErr } from '../../shared/functions';
import jwt from 'jsonwebtoken';

export async function githubAuthController(req: Request, res: Response) {
  try {
    const { body } = req;
    const code: string = body.code;
    const userInfo = await verifyGithubCode(code);

    const fullName: string[] = userInfo.user.name?.split(" ");
    const email = userInfo.userEmail;
    const userData: UserObject = {
      firstName: fullName?.length ? fullName[0] : '',
      lastName: fullName?.length ? fullName[1] : '',
      email
    };
    const user = await createUser(userData);
    const token = createJwtToken(user.id);
    const refreshToken = createRefreshJwtToken(user.id);

    res.cookie('__refresh_token', refreshToken, {
      secure: false, // set to true if your using https or samesite is none
    httpOnly: true, // backend only
    //sameSite: 'none',
    expires: new Date(Date.now() + (3600 * 1000 * 24 * 180 * 1)), 
    });
    // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
     res.header('Access-Control-Allow-Credentials', 'true');
    // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    
    return res.status(StatusCodes.OK).json({ token, user });
  } catch (error) {
    pErr(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
}

export async function googleAuthController(req: Request, res: Response) {
  try {
    const { body } = req;
    const token: string = body.token;
    const userInfo = await verifyGoogleCode(token);

    const userData: UserObject = {
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

export function refreshTokenConroller(req: Request, res: Response) {
  console.log("hello")
  const cookies = req.cookies;
  console.log("hello", JSON.stringify(cookies));
  if (!cookies?.__refresh_token) return res.status(StatusCodes.UNAUTHORIZED);
  console.log(cookies.__refresh_token);
  const refreshToken = cookies.__refresh_token;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_SECRET,
    (err, decoded) => {
      if (err) return res.status(StatusCodes.FORBIDDEN).json({ message: err.message });

      const accessToken = createJwtToken(refreshToken.userId);
      return res.status(StatusCodes.OK).json({ token: accessToken });
    }
  )
}

//this will delete the refresh token on the UI. Still need to imlement deleting the jwt from state on ui
export function handleLogout(req: Request, res: Response) {
  const cookies = req.cookies;
  if (!cookies?.__refresh_token) return res.status(StatusCodes.NO_CONTENT);
  // should I be checking the signiture of the cookie here? Lick check if user id is real
  res.clearCookie('__refresh_token', { httpOnly: true });
  return res.status(StatusCodes.NO_CONTENT);
}


// import {Request, Response } from 'express';
// import StatusCodes from 'http-status-codes';
// import { verifyGithubCode, verifyGoogleCode, createJwtToken } from './auth.service';
// import { createUser } from '../users/users.service';
// import { UserObject } from '../users/users.interface';
// import { pErr } from '../../shared/functions';

// export async function githubAuthController(req: Request, res: Response) {
//   try {
//     const { body } = req;
//     const code: string = body.code;
//     const userInfo = await verifyGithubCode(code);

//     const fullName: string[] = userInfo.user.name?.split(" "); 
//     const email = userInfo.userEmail;
//     const userData:UserObject = { 
//       firstName: fullName?.length ? fullName[0] : '',
//       lastName: fullName?.length ? fullName[1] : '',
//       email
//     };
//     const user = await createUser(userData);
//     const token = createJwtToken(user.id)
//     return res.status(StatusCodes.OK).json({ token, user });
//   } catch (error) {
//     pErr(error.message);
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
//   }
// }

// export async function googleAuthController(req: Request, res: Response) {
//   try {
//     const { body } = req;
//     const token: string = body.token;
//     const userInfo = await verifyGoogleCode(token);

//     const userData:UserObject = { 
//       firstName: userInfo.given_name,
//       lastName: userInfo.family_name,
//       email: userInfo.email
//     };
//     const user = await createUser(userData);
//     const jwtToken = createJwtToken(user.id)
//     return res.status(StatusCodes.OK).json({ token: jwtToken, user });
//   } catch (error) {
//     pErr(error.message);
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
//   }
// }
