export interface ProjectObject {
  id?: string;
  name: string;
  description?: string;
  author?: string;
  WorkspaceId?: string;
}

export interface ProjectRequestBody extends ProjectObject {
  workspaceId: string;
}