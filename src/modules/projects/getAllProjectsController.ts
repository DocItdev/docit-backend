import {Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import {getAllProjects} from '../../services/projectServices';

export default async function getAllProjectsController(req: Request, res: Response) {
  try {
    //@ts-ignore
        const userId = req.user.id;
        console.log(userId);
        const projects = await getAllProjects(userId);
        
      return res.status(StatusCodes.OK).json({ projects });
    
  } catch(error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}