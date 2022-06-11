
import { TeamAttributes } from "./teams.interface";
import Team from "./teams.model";

export async function createTeam(data: TeamAttributes) {
  const team = await Team.create(data);
  await team.save();
  return team;
}


export async function getTeamById(teamId: string) {
  const team = await Team.findOne({
    where: {
      id: teamId,
    },
  });
  return team;
}

export async function getTeamByTitle(teamTitle: string) {
  const team = await Team.findOne({
    where: {
      title: teamTitle,
    },
  });
  return team;
}

export async function updateTeam(team: Team) {
  const result: [number, Team[]] = await Team.update({...team}, {
    where: {
      id: team.id,
    }
  });
  return result;
}

export async function deleteTeam(teamId: string) {
  const statusCode: number =  await Team.destroy({
    where: {
      id: teamId,
    }
  });
  return statusCode;
}
