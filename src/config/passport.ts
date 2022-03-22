
import { Passport } from 'passport';
import { jwtStrategy } from '../modules/authentication/auth.middleware';

const passport = new Passport();

passport.use(jwtStrategy);

export default passport;