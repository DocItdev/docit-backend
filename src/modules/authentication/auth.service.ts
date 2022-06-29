/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { pErr, pInfo } from '../../shared/functions';
import axios from 'axios';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';


function handleGithubError(response) {
  const error: string = response.error_description;
  const err: Error = new Error(error);
  pErr(err);
  throw err;
}

export async function verifyGithubCode(code: string) {
  pInfo('GITHUB Code',code);
  const body = {
    'client_id': process.env.GITHUB_CLIENT_ID,
    'client_secret': process.env.GITHUB_CLIENT_SECRET,
    code
  }
  const opts = { headers: { accept: 'application/json' } };
   // Request to exchange code for an access token
  let response = await axios.post('https://github.com/login/oauth/access_token',body, opts)
  const params = await response.data;
  if (params.error) {
    handleGithubError(params)
  }
  const accessToken: string = params['access_token']
  // Request to return data of a user that has been authenticated
  response = await axios.get(`https://api.github.com/user`, {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
  const user = await response.data;
  pInfo('GITHUB USER', JSON.stringify(user));
  if (user.error) {
    handleGithubError(user);
  }
  //request to get user email from github
  response = await axios.get(`https://api.github.com/user/emails`, {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });

  const userEmails = await response.data;
  pInfo('USER EMAILS', JSON.stringify(userEmails));
  if (userEmails.error) {
    handleGithubError(userEmails);
  }

  const userPrimaryEmail = userEmails.find(emailObject => emailObject.primary)
  return {user, accessToken, userEmail:userPrimaryEmail.email};
}


export async function verifyGoogleCode(token: string) {

  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  pInfo('GOOGLE_CLIENT', JSON.stringify(client));
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID
  });
  pInfo('GOOGLE_TICKET', JSON.stringify(ticket));
  const payload = ticket.getPayload(); 

  return  payload ;
}

export function createJwtToken(userId: string): string {
  return jwt.sign({ userId }, process.env.COOKIE_SECRET, {
    expiresIn: "1m",
  });
}

export function createRefreshJwtToken(userId: string): string {
  return jwt.sign({ userId }, process.env.REFRESH_SECRET, {
    expiresIn: "5m",
  });
}

