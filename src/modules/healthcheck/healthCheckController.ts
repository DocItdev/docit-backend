import {Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import { sequelize } from '../../models';


export default async function healthCheckController(req: Request, res: Response) {
  try {
    await sequelize.authenticate();
    return res.status(StatusCodes.OK).json({ message: "Working correctly" });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}