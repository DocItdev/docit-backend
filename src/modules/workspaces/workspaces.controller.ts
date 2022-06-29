import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { pErr } from '../../shared/functions';
import { UserRequest } from '../users/users.interface';
import { WorkspaceAttributes } from './workspaces.interface';
import { createWorkspace, getWorkspaceByName } from './workspaces.service';


export async function createWorkspaceController(req: UserRequest, res: Response) {
  try {
    const workspaceData = req.body as WorkspaceAttributes;
    const userId: string = req.user.id;
    const workspace = await createWorkspace(workspaceData, { UserId: userId, role: 'admin' });
    return res.status(StatusCodes.OK).json(workspace);
  } catch(error) {
    pErr(error.message);
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}

export async function getWorkspaceController(req: Request, res: Response) {
  try {
    const workspaceName = req.params.name;
    const workspace = await getWorkspaceByName(workspaceName);
    return res.status(StatusCodes.OK).json(workspace);
  } catch(error) {
    pErr(error.message);
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}