import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { pErr } from "../../shared/functions";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProject,
  updateProject,
} from "./projects.service";

export async function createProjectController(req: Request, res: Response) {
  try {
    const { body } = req;
    const projectName = body.name;
    const projectDescription = body.description;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const userId = req.user.id;
    const project = await createProject({
      name: projectName,
      description: projectDescription,
      UserId: userId,
    });

    return res.status(StatusCodes.OK).json(project);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}

export async function deleteProjectController(req: Request, res: Response) {
  try {
    const projectId = req.params.id;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const userId: string = req.user.id;

    const successCode = await deleteProject(userId, projectId);
    return res.status(StatusCodes.OK).json(successCode);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}

export async function getAllProjectsController(req: Request, res: Response) {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const userId: string = req.user.id;
    const projects = await getAllProjects(userId);

    return res.status(StatusCodes.OK).json({ projects });
  } catch (error) {
    pErr(error);
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}

export async function getProjectController(req: Request, res: Response) {
  try {
    const projectId = req.params.id;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const userId: string = req.user.id;
    const project = await getProject(projectId, userId);
    return res.status(StatusCodes.OK).json(project);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}

export async function updateProjectController(req: Request, res: Response) {
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
