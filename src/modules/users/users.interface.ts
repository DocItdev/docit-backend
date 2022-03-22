import { Request } from 'express';
import User from './users.model';

export interface UserObject {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserRequest extends Request {
  user: User;
}