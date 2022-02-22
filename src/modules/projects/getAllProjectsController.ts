import {Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import {getAllProjects} from '../../services/projectServices';

export default async function getAllProjectsController(req: Request, res: Response) {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
        const userId: string = req.user.id;
        const projects = await getAllProjects(userId);
        
      return res.status(StatusCodes.OK).json({ projects });
    
  } catch(error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}