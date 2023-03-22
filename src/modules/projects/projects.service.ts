import Project from "./projects.model";
import Document from "../documents/documents.model";
import { ProjectObject } from "./projects.interface";
import { createDocument } from "../documents/documents.service";
import { createPost } from "../posts/posts.service";
import postMock from "../posts/posts.json";

export async function createProject(project: ProjectObject) {
  const projectDoc = await Project.create({ ...project });
  await projectDoc.save();
  return projectDoc;
}

export async function createInitialProject(
  userId: string,
  workspaceId: string
): Promise<Project> {
  const projectDoc = await Project.create({
    name: "Sample Project",
    description: "auto-generated personal project",
    author: userId,
    WorkspaceId: workspaceId,
  });
  await projectDoc.save();
  const document = await createDocument({
    ProjectId: projectDoc.get("id"),
    name:"Sample Document",
    textContent: ''
  });
  await document.save();
  const post = await createPost(document.get("id"), postMock);
  await post.save();
  return projectDoc;
}

export async function getAllProjects(workspaceId: string) {
  const projects = await Project.findAll({
    where: {
      WorkspaceId: workspaceId,
    },
    include: [Document],
  });
  return projects;
}

export async function getProject(projectId: string, workspaceId: string) {
  const projects = await Project.findOne({
    where: {
      id: projectId,
      WorkspaceId: workspaceId,
    },
    include: [Document],
  });
  return projects;
}

export async function updateProject(
  workspaceId: string,
  projectId: string,
  newProject: ProjectObject
) {
  const successCode = await Project.update(newProject, {
    where: {
      id: projectId,
      WorkspaceId: workspaceId,
    },
  });
  return successCode;
}

export async function deleteProject(workspaceId: string, projectId: string) {
  const successCode = await Project.destroy({
    where: {
      id: projectId,
      WorkspaceId: workspaceId,
    },
  });
  return successCode;
}
