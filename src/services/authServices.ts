/* eslint-disable @typescript-eslint/no-unsafe-return */
import { pErr } from '@shared/functions';
import axios from 'axios';

function handleGithubError(response) {
  const error: string = response.error_description;
  const err: Error = new Error(error);
  pErr(err);
  throw err;
}

export async function verifyGithubCode(code: string) {
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
  if (user.error) {
    handleGithubError(user);
  }
  return user;
}