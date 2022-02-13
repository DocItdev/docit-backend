/* eslint-disable @typescript-eslint/no-unsafe-call */
import User, { UserInstance } from '../models/User';

export interface UserObject {
  email: string;
  firstName: string;
  lastName: string;
}

export async function createUser(user: UserObject) {

  const existingUser = await User.findOne({ where: { email: user.email } });
  if (existingUser) {
    return existingUser
  }
  const userDoc = await User.create({ ...user });
  await userDoc.save();
  return userDoc;
}

export async function findUser(email: string): Promise<UserInstance> {
  const user = await User.findOne({ where: { email } });
  if (user) {
    return user;
  }
  throw new Error("User Not Found");
}

export async function findUserById(id: string): Promise<UserInstance> {
  const user = await User.findOne({ where: { id } });
  if (user) {
    return user;
  }
  throw new Error("User Not Found");
}