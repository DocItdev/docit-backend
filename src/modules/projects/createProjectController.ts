import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { createProject } from '../../services/projectServices';

export default async function createProjectController(req: Request, res: Response) {
  try{
    const { body } = req;
    const projectName = body.name;
    const projectDescription = body.description;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const userId = req.user.id;
    const project = await createProject({
        name:projectName,
        description: projectDescription,
        UserId:userId
    })

    return res.status(StatusCodes.OK).json(project);

  } catch(error){
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });

  }
}