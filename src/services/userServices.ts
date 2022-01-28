/* eslint-disable @typescript-eslint/no-unsafe-call */
import { v4 as UUIDV4 } from 'uuid';
import { User } from '../models';
import { UserInstance } from '../models/User';



export async function createUser(user: object) {
  const uniqueId: string = UUIDV4()
  const userDoc = await User.create({ id: uniqueId, ...user });
  await userDoc.save();
}

export async function getUser(email: string): Promise<UserInstance> {
  const user = await User.findOne({ where: { email } });
  if (user) {
    return user
  }
  throw new Error("User Not Found")
}