import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { pErr } from '../../shared/functions';
import { WorkspaceAttributes } from './workspaces.interface';
import { createWorkspace } from './workspaces.service';


export async function createWorkspaceController(req: Request, res: Response) {
  try {
    const workspaceData = req.body as WorkspaceAttributes;
    const workspace = await createWorkspace(workspaceData);
    return res.status(StatusCodes.OK).json(workspace);
  } catch(error) {
    pErr(error.message);
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}