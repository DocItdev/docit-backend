/* eslint-disable @typescript-eslint/no-unsafe-call */
import githubPassport from 'passport-github2';
import { createUser, findUser } from '../services/userServices';


// Github strategy that enables signup and login
export const GithubStrategy = new githubPassport.Strategy({
  clientID:       process.env.GITHUB_CLIENT_ID,
  clientSecret:   process.env.GITHUB_CLIENT_SECRET,
  callbackURL:    process.env.GITHUB_CALLBACK_URL,
}, (accessToken, refreshToken, profile, done) => {
  const processUserLogin = async (profile, done) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const user = await findUser(profile.email)
      if (user) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return done(null, user);
      }
      else {
          const newUser = await createUser({
              name:        profile.displayName,
              username:    profile.username,
              photoUrl:    profile.photos[0].value,
              githubId:    profile.id,
              githubUrl:   profile.profileUrl,
          });
          done(null, newUser);
      }
    }
    catch (error) {
        done(error, null);
    }
  }
  processUserLogin(profile, done)
});