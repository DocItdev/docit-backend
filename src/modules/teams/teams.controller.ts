import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { pErr } from '../../shared/functions';
import { TeamAttributes } from './teams.interface';
import { createTeam } from './teams.service';


export async function createTeamController(req: Request, res: Response) {
  try {
    const teamData = req.body as TeamAttributes;
    const team = await createTeam(teamData);
    return res.status(StatusCodes.OK).json(team);
  } catch(error) {
    pErr(error.message);
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}