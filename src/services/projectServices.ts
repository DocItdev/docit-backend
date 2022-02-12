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
    console.log(userId);

    const projects = await Project.findAll({
        where: {
            UserId: userId
        }
    });
    return projects;
}


export async function getProject(projectId:string, userId: string){
    const projects = await Project.findOne({
        where: {
            id:projectId,
            UserId: userId
        }
    });
    return projects;
}

export async function updateProject(userId:string, projectId:string, newProjectName:string, newProjectDescription:string){
    
    const successCode = await Project.update({
        name:newProjectName,
        description: newProjectDescription
    },{
        where: {
            id:projectId,
            UserId: userId
        }
    });
    return successCode;
}

export async function deleteProject(userId:string, projectId:string,){
    
    const successCode = await Project.destroy({
        where: {
            id:projectId,
            UserId: userId
        }
    });
    return successCode;
}