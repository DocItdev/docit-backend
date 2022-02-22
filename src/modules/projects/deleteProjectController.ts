import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { deleteProject } from '../../services/projectServices';

export default async function deleteProjectController(req: Request, res: Response) {
  try{
    const projectId = req.params.id;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const userId: string = req.user.id;

    const successCode = await deleteProject(userId, projectId);
    return res.status(StatusCodes.OK).json(successCode);

  } catch(error){
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });

  }
}