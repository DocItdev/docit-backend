import {Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { pErr } from '../../shared/functions';
import { UserWorkspaceAttributes } from './userworkspaces.interface';
import { associateUserWorkspace, disassociateUserWorkspace } from './userworkspaces.service';

export async function addUserToWorkspace(req: Request, res: Response) {
  try {
    const association = req.body as UserWorkspaceAttributes;
    await associateUserWorkspace(association);
    return res.status(StatusCodes.OK).json({ message: 'User Added to workspace!' });
  } catch(error) {
    pErr(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}

export async function removeUserFromWorkspace(req: Request, res: Response) {
  try {
    const association = req.body as UserWorkspaceAttributes;
    const resultCode: number = await disassociateUserWorkspace(association);
    return res.status(StatusCodes.OK).json(resultCode);
  } catch(error) {
    pErr(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}