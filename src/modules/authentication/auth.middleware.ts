import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserRequest } from '../users/users.interface';
import { findUserById } from '../users/users.service';
import { verifyJwtToken } from './auth.service';

/**
 @description In this module we decipher the JWT token and the data, or payload,
 that is sent with it. 
 @returns It returns the userId if the user exists in the database otherwise it 
 return null. 
*/
export const jwtStrategy = new Strategy({
  secretOrKey: process.env.COOKIE_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
  try {
    const user = await findUserById(token.userId);
    if(!user) {
      done(null, null)
    }
    return done(null, { id: token.userId });
  } catch (error) {
    done(error);
  }
})

export async function validateRefreshToken(req: UserRequest, res: Response, next:NextFunction){
  try {
    const cookies = req.cookies;
    if (!cookies?.__refresh_token) return res.status(StatusCodes.UNAUTHORIZED);

    const refreshToken = cookies.__refresh_token;
    const decoded = verifyJwtToken(refreshToken);

    const user = await findUserById(decoded.userId);

    if (!user){
      return res.status(StatusCodes.UNAUTHORIZED);
    }
    req.user = user;
    next();
    
  } catch (error) {
    return next(error);
  }
}
