/* eslint-disable @typescript-eslint/no-unsafe-call */
import User from "./users.model";
import { UserObject } from "./users.interface";
import Workspace from "../workspaces/workspaces.model";
import { createWorkspace } from "../workspaces/workspaces.service";
import { disassociateUserWorkspace } from "../userworkspaces/userworkspaces.service";

export async function createUser(user: UserObject) {
  const existingUser = await User.findOne({ where: { email: user.email } });
  if (existingUser) {
    return existingUser;
  }
  // createUser
  const userDoc = await User.create(user);
  // create personal workspace
  const workspaceTitle = 'My Workspace';
  await createWorkspace(
    {
      title: workspaceTitle,
      personal: true,
    },
    {
      UserId: userDoc.id,
      role: "admin",
    }
  );
  await userDoc.save();
  return userDoc;
}

export async function findUserByEmail(email: string): Promise<User> {
  const user = await User.findOne({ where: { email }, include: [Workspace] });
  if (user) {
    return user;
  }
  throw new Error("User Not Found");
}

export async function findUserById(id: string): Promise<User> {
  const user = await User.findOne({ where: { id }, include: [Workspace] });
  if (user) {
    return user;
  }
  throw new Error("User Not Found");
}

export async function deleteUserById(id: string): Promise<number> {
  await disassociateUserWorkspace({ UserId: id });
  const resolvedCode = await User.destroy({
    where: { id },
  });
  return resolvedCode;
}
