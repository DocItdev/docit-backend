/* eslint-disable @typescript-eslint/no-unsafe-call */
import { UserInstance } from "@entities/User";
import passport from "passport";
import { findUser } from '../services/userServices';
import { GithubStrategy } from "./githubStrategy.js";

// binding the types of authentication
passport.use(GithubStrategy);

// needed to save the cookie when just signed in
passport.serializeUser((user: UserInstance, done) => {
  done(null, user.email);
});

// needed to keep track of the user whan already signed in
passport.deserializeUser((id: string, done) => {
  const processUser = async (id: string, done) => {
    try {
      const user = await findUser(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
  processUser(id, done);
});

module.exports = passport;