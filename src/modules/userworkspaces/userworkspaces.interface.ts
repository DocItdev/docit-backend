export interface UserWorkspaceAttributes {
  UserId?: string;
  WorkspaceId?: string;
  role?: string;
}

export interface WorkspaceUsers {
  WorkspaceId: string;
  emails: string[];
}
