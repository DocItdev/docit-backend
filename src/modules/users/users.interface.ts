import { Request } from 'express';
import { WorkspaceAttributes } from '../workspaces/workspaces.interface';
import User from './users.model';

export interface UserObject {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  workspaces?: WorkspaceAttributes[];
}

export interface UserRequest extends Request {
  user: User;
}