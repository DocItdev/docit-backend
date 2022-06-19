
import { UserWorkspaceAttributes } from "../userworkspaces/userworkspaces.interface";
import {
  associateUserWorkspace,
  disassociateUserWorkspace
} from "../userworkspaces/userworkspaces.service";
import { WorkspaceAttributes } from "./workspaces.interface";
import Workspace from "./workspaces.model";

export async function createWorkspace(
  data: WorkspaceAttributes,
  associationData: UserWorkspaceAttributes
  ) {
  const workspace = await Workspace.create(data);
  await workspace.save();
  await associateUserWorkspace({ 
    UserId: associationData.UserId,
    WorkspaceId: workspace.id,
    role: associationData.role
  });
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
  await disassociateUserWorkspace({ WorkspaceId: workspaceId });
  const statusCode: number = await Workspace.destroy({
    where: {
      id: workspaceId,
    }
  });
  return statusCode;
}
