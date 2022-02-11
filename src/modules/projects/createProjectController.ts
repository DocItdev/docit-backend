import {Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import {getAllProjects, createProject} from '../../services/projectServices';

export default async function createProjectController(req: Request, res: Response) {
  
}