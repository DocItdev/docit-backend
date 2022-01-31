import {Request, Response } from 'express';
import StatusCodes from 'http-status-codes';

export default async function logoutController(req: Request, res: Response) {
  try {
      req.logout();
    return res.status(StatusCodes.OK);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}