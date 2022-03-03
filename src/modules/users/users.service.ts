/* eslint-disable @typescript-eslint/no-unsafe-call */
import User from './users.model';
import { UserObject } from './users.interface';

export async function createUser(user: UserObject) {

  const existingUser = await User.findOne({ where: { email: user.email } });
  if (existingUser) {
    return existingUser
  }
  const userDoc = await User.create({ ...user });
  await userDoc.save();
  return userDoc;
}

export async function findUser(email: string): Promise<User> {
  const user = await User.findOne({ where: { email } });
  if (user) {
    return user;
  }
  throw new Error("User Not Found");
}

export async function findUserById(id: string): Promise<User> {
  const user = await User.findOne({ where: { id } });
  if (user) {
    return user;
  }
  throw new Error("User Not Found");
}