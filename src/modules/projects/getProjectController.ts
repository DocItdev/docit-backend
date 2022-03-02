import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { getProject } from '../../services/projectServices';

export default async function getProjectController(req: Request, res: Response) {
  try{
    const projectId = req.params.id;
    //@ts-ignore
    const userId: string = req.user.id;
    const project = await getProject(projectId,  userId);
    return res.status(StatusCodes.OK).json(project);

  } catch(error){
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });

  }
}