import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { pErr } from "../../shared/functions";
import {
  UserWorkspaceAttributes,
  WorkspaceUsers,
} from "./userworkspaces.interface";
import {
  associateUserWorkspace,
  disassociateUserWorkspace,
  addUsersToWorkspaceByEmail,
} from "./userworkspaces.service";

export async function addUserToWorkspace(req: Request, res: Response) {
  try {
    const association = req.body as UserWorkspaceAttributes;
    await associateUserWorkspace(association);
    return res
      .status(StatusCodes.OK)
      .json({ message: "User Added to workspace!" });
  } catch (error) {
    pErr(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}

export async function addWorkspaceMembers(req: Request, res: Response) {
  try {
    const workspaceUsers = req.body as WorkspaceUsers;
    const result = await addUsersToWorkspaceByEmail(workspaceUsers);
    return res
    .status(StatusCodes.OK)
    .json(result);
  } catch (error) {
    pErr(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}

export async function removeUserFromWorkspace(req: Request, res: Response) {
  try {
    const association = req.body as UserWorkspaceAttributes;
    const resultCode: number = await disassociateUserWorkspace(association);
    return res.status(StatusCodes.OK).json(resultCode);
  } catch (error) {
    pErr(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}
