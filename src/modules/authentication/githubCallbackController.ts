import {Request, Response } from 'express';
import StatusCodes from 'http-status-codes';

export default async function githubCallbackController(req: Request, res: Response) {
  try {
      
    return res.status(StatusCodes.OK).redirect('http.localhost:3000/docit');
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}