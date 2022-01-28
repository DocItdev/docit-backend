import { User } from '../models';
import { UserInstance } from '../models/User';



export async function createUser(user: object) {
  const userDoc = await User.create({ ...user });
  await userDoc.save();
}

export async function getUser(email: string): Promise<UserInstance> {
  const user = await User.findOne({ where: { email } });
  if (user) {
    return user
  }
  throw new Error("User Not Found")
}