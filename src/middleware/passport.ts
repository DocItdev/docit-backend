/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Passport } from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { findUserById } from '../services/userServices';


/**
 *@description In this module we decipher the JWT token and the data, or payload,
 that is sent with it. 
 @returns It returns the userId if the user exists in the database otherwise it 
 return null. 
*/

const passport = new Passport();
const jwtStrategy = new Strategy({
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

passport.use(jwtStrategy);

export default passport;