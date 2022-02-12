import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { createDocument } from '../../services/documentServices';

export default async function createDocumentController(req: Request, res: Response) {
  try{
    const { body } = req;
    const documentName = body.name;
    const projectId = req.query.projectId;
    const document = await createDocument(
        projectId,
        documentName
    );

    return res.status(StatusCodes.OK).json(document);

  } catch(error){
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });

  }
}