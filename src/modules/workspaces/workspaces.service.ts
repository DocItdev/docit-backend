
import { WorkspaceAttributes } from "./workspaces.interface";
import Workspace from "./workspaces.model";

export async function createWorkspace(data: WorkspaceAttributes) {
  const workspace = await Workspace.create(data);
  await workspace.save();
  return workspace;
}


export async function getWorkspaceById(workspaceId: string) {
  const workspace = await Workspace.findOne({
    where: {
      id: workspaceId,
    },
  });
  return workspace;
}

export async function getWorkspaceByTitle(workspaceTitle: string) {
  const workspace = await Workspace.findOne({
    where: {
      title: workspaceTitle,
    },
  });
  return workspace;
}

export async function updateWorkspace(workspace: Workspace) {
  const result: [number, Workspace[]] = await Workspace.update({...workspace}, {
    where: {
      id: workspace.id,
    }
  });
  return result;
}

export async function deleteWorkspace(workspaceId: string) {
  const statusCode: number = await Workspace.destroy({
    where: {
      id: workspaceId,
    }
  });
  return statusCode;
}
