import Project from "./projects.model";
import Document from "../documents/documents.model";
import { ProjectObject } from "./projects.interface";
import { createDocument } from "../documents/documents.service";
import { createPost } from "../posts/posts.service";
import postMock from '../posts/posts.json';

export async function  createProject(project: ProjectObject){
    const projectDoc = await Project.create({ ...project });
    await projectDoc.save();
    return projectDoc;
}

export async function createInitialProject(userId:string,): Promise<Project> {
    const projectDoc = await Project.create({
        name: 'Sample Project',
        description: 'auto-generated personal project',
        UserId: userId,
    });
    await projectDoc.save();
    const document = await createDocument(projectDoc.get('id'), 'Sample Document');
    await document.save();
    const post = await createPost(document.get('id'), postMock)
    await post.save();
    return projectDoc;
}

export async function getAllProjects(userId: string){
    const projects = await Project.findAll({
        where: {
            UserId: userId
        },
        include: [Document]
    });
    return projects;
}


export async function getProject(projectId:string, userId: string){
    const projects = await Project.findOne({
        where: {
            id:projectId,
            UserId: userId
        },
        include: [Document]
    });
    return projects;
}

export async function updateProject(
    userId:string, projectId:string,
    newProjectName:string,
    newProjectDescription:string){
    
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
