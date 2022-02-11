import Project from "src/models/Project";

export interface ProjectObject{
    name: string;
    description?: string;
    UserId: string;
}

export async function  createProject(project: ProjectObject){
    const projectDoc = await Project.create({ ...project });
    await projectDoc.save();
    return projectDoc;
}

export async function getAllProjects(userId: string){
    const projects = await Project.findAll({
        where: {
            userId
        }
    })
    return projects;
}