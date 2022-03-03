import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createDocument,
  deleteDocument,
  getAllDocuments,
  updateDocument,
} from "./documents.service";

export async function createDocumentController(req: Request, res: Response) {
  try {
    const { body } = req;
    const documentName: string = body.name;
    const projectId: string = req.query.projectId as string;
    const document = await createDocument(projectId, documentName);

    return res.status(StatusCodes.OK).json(document);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}

export async function getAllDocumentsController(
  req: Request,
  res: Response
) {
  try {
    const projectId = req.query.projectId as string;
    const document = await getAllDocuments(projectId);
    return res.status(StatusCodes.OK).json(document);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}

export async function deleteDocumentController(req: Request, res: Response) {
  try {
    const documentId: string = req.params.id;
    const document = await deleteDocument(documentId);
    return res.status(StatusCodes.OK).json(document);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}

export async function updateDocumentController(req: Request, res: Response) {
  try{

    const { body } = req;
    const documentName: string = body.name;
    const documentId: string = req.params.id;
    const document = await updateDocument( documentId, documentName );
    return res.status(StatusCodes.OK).json(document);

  } catch(error){
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });

  }
}
