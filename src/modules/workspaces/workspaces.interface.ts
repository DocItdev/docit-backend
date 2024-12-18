import { UserWorkspaceAttributes } from "../userworkspaces/userworkspaces.interface";

export interface WorkspaceAttributes {
  id?: string;
  title: string;
  description?: string;
  personal?: boolean;
  User_Workspace?: UserWorkspaceAttributes;
}