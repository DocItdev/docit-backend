import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { pErr } from "../../shared/functions";
import { UserRequest } from "../users/users.interface";
import { ProjectRequestBody } from "./projects.interface";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProject,
  updateProject,
} from "./projects.service";

export async function createProjectController(req: UserRequest, res: Response) {
  try {
    const { name, description, workspaceId } = req.body as ProjectRequestBody;
    const author = req.user.id;
    const project = await createProject({
      name,
      description,
      author,
      WorkspaceId: workspaceId
    });

    return res.status(StatusCodes.OK).json(project);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}

export async function deleteProjectController(req: Request, res: Response) {
  try {
    const projectId = req.params.id;
    const workspaceId: string = req.query.workspaceId as string;

    const successCode = await deleteProject(workspaceId, projectId);
    return res.status(StatusCodes.OK).json(successCode);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}

export async function getAllProjectsController(req: Request, res: Response) {
  try {
    const workspaceId: string = req.query.workspaceId as string;
    const projects = await getAllProjects(workspaceId);

    return res.status(StatusCodes.OK).json({ projects });
  } catch (error) {
    pErr(error);
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}

export async function getProjectController(req: Request, res: Response) {
  try {
    const projectId = req.params.id;
    const workspaceId: string = req.query.workspaceId as string;
    const project = await getProject(projectId, workspaceId);
    return res.status(StatusCodes.OK).json(project);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}

export async function updateProjectController(req: UserRequest, res: Response) {
  try{
    const projectId = req.params.id;
    const workspaceId: string = req.query.workspaceId as string;
  const projectData = req.body as ProjectRequestBody;

    const successCode = await updateProject(
      workspaceId, projectId, projectData);
    return res.status(StatusCodes.OK).json(successCode);

  } catch(error){
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });

  }
}
