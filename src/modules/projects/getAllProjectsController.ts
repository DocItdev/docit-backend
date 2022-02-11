import {Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import {getAllProjects} from '../../services/projectServices';

export default async function getAllProjectsController(req: Request, res: Response) {
  try {
        const userId = req.body.userId;
        const projects = await getAllProjects(userId);
        
      return res.status(StatusCodes.OK).json({ projects });
    
  } catch(error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}