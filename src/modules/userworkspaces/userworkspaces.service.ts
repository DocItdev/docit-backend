import User from "../users/users.model";
import {
  UserWorkspaceAttributes,
  WorkspaceUsers,
} from "./userworkspaces.interface";
import User_Workspace from "./userworkspaces.model";

export async function associateUserWorkspace(
  association: UserWorkspaceAttributes
) {
  const userWorkspace = await User_Workspace.create(association);
  await userWorkspace.save();
}

export async function disassociateUserWorkspace(
  association: UserWorkspaceAttributes
) {
  const outcomeCode: number = await User_Workspace.destroy({
    where: association,
  });
  return outcomeCode;
}

export async function addUsersToWorkspaceByEmail(workspaceUsers: WorkspaceUsers) {
  const userPromises: Promise<User>[] = workspaceUsers.emails.map((email) =>
    User.findOne({ where: { email } })
  );
  const users: User[] = await Promise.all(userPromises);
  const userWorkspacePromises: Promise<User_Workspace>[] = users.map((user) => {
    if (!user) {
      return Promise.resolve(null);
    }
    return User_Workspace.create({
      WorkspaceId: workspaceUsers.WorkspaceId,
      UserId: user.id,
    });
  });
  const userWorkspaces: User_Workspace[] = await Promise.all(userWorkspacePromises);
  return userWorkspaces;
}
