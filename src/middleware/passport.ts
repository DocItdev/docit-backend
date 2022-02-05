/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Passport } from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { findUserById } from '../services/userServices';

const passport = new Passport();

const jwtStrategy = new Strategy({
  secretOrKey: process.env.COOKIE_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
  try {
    const user = await findUserById(token.userId);
    if(!user) {
      done(null, false)
    }
    return done(null, token.userId);
  } catch (error) {
    done(error);
  }
})

passport.use(jwtStrategy);

export default passport;