import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { DocumentType } from './documents.interface';
import {
  createDocument,
  deleteDocument,
  getAllDocuments,
  getDocumentById,
  updateDocument,
} from "./documents.service";

export async function createDocumentController(req: Request, res: Response) {
  try {
    const newDocument = req.body as DocumentType;
    const document = await createDocument(newDocument);

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
    const projectId: string = req.params.projectId;
    const document = await getAllDocuments(projectId);
    return res.status(StatusCodes.OK).json(document);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}

export async function getDocumentByIdController(req: Request, res: Response) {
  try {
    const projectId: string = req.params.projectId;
    const docId: string = req.params.docId;
    const document = await getDocumentById(projectId, docId);
    return res.status(StatusCodes.OK).json(document);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}

export async function deleteDocumentController(req: Request, res: Response) {
  try {
    const documentId: string = req.params.docId;
    const projectId: string = req.params.projectId;
    const document = await deleteDocument(documentId, projectId);
    return res.status(StatusCodes.OK).json(document);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}

export async function updateDocumentController(req: Request, res: Response) {
  try{

    const documentData = req.body as DocumentType
    const document = await updateDocument(documentData);
    return res.status(StatusCodes.OK).json(document);

  } catch(error){
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });

  }
}
