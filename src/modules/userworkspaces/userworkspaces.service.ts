import { UserWorkspaceAttributes } from "./userworkspaces.interface";
import User_Workspace from "./userworkspaces.model";


export async function associateUserWorkspace(association: UserWorkspaceAttributes) {
  const userWorkspace = await User_Workspace.create(association);
  await userWorkspace.save();
}

export async function disassociateUserWorkspace(association: UserWorkspaceAttributes) {
  const outcomeCode: number = await User_Workspace.destroy({ where: association });
  return outcomeCode;
}
