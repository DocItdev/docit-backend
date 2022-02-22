import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { updateProject } from '../../services/projectServices';

export default async function updateProjectController(req: Request, res: Response) {
  try{
    const projectId = req.params.id;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const userId: string = req.user.id;
    const newProjectName: string = req.body.name;
    const newProjectDescription: string = req.body.description;

    const successCode = await updateProject(
      userId, projectId, newProjectName, newProjectDescription);
    return res.status(StatusCodes.OK).json(successCode);

  } catch(error){
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });

  }
}