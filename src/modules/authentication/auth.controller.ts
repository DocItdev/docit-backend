import { Request, Response } from "express";
import StatusCodes from "http-status-codes";
import {
  verifyGithubCode,
  verifyGoogleCode,
  createJwtToken,
  createRefreshJwtToken,
} from "./auth.service";
import { createUser, findUserByEmail } from "../users/users.service";
import { UserObject, UserRequest } from "../users/users.interface";
import { pErr } from "../../shared/functions";
import { AUTH_TOKEN_EXPIRES_IN } from "../../shared/constants";

export async function githubAuthController(req: Request, res: Response) {
  try {
    const { body } = req;
    const code: string = body.code;
    const userInfo = await verifyGithubCode(code);

    const fullName: string[] = userInfo.user.name?.split(" ");
    const email = userInfo.userEmail;
    const userData: UserObject = {
      firstName: fullName?.length ? fullName[0] : "",
      lastName: fullName?.length ? fullName[1] : "",
      email,
    };
    await createUser(userData);
    const user = await findUserByEmail(email);
    const token = createJwtToken(user.id);
    const refreshToken = createRefreshJwtToken(user.id);

    res.cookie("__refresh_token", refreshToken, {
      secure: true, // set to true if your using https or samesite is none
      httpOnly: true, // backend only
      sameSite: "none",
      expires: new Date(Date.now() + 3600 * 1000 * 24 * 180 * 1),
    });

    return res.status(StatusCodes.OK).json({ token, user, expiresIn: AUTH_TOKEN_EXPIRES_IN });
  } catch (error) {
    pErr(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
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
      email: userInfo.email,
    };
    await createUser(userData);
    const user = await findUserByEmail(userInfo.email);
    const jwtToken = createJwtToken(user.id);
    const refreshToken = createRefreshJwtToken(user.id);

    res.cookie("__refresh_token", refreshToken, {
      secure: true, // set to true if your using https or samesite is none
      httpOnly: true, // backend only
      sameSite: "none",
      expires: new Date(Date.now() + 3600 * 1000 * 24 * 180 * 1),
    });
    return res.status(StatusCodes.OK).json({ token, user, expiresIn: AUTH_TOKEN_EXPIRES_IN });
  } catch (error) {
    pErr(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

export function refreshTokenController(req: UserRequest, res: Response) {
  try {
    const user = req.user;
    const token = createJwtToken(user.id);

    return res.status(StatusCodes.OK).json({ token, user, expiresIn: AUTH_TOKEN_EXPIRES_IN });
  } catch (error) {
    pErr(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

export function handleLogout(req: Request, res: Response) {
  const cookies = req.cookies;
  if (!cookies?.__refresh_token) return res.status(StatusCodes.NO_CONTENT);
  // should I be checking the signiture of the cookie here? Lick check if user id is real
  res.clearCookie("__refresh_token", { httpOnly: true });
  return res.status(StatusCodes.NO_CONTENT);
}
