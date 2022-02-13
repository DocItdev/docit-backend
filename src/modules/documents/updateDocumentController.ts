import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { updateDocument } from '../../services/documentServices';

export default async function updateDocumentController(req: Request, res: Response) {
  try{

    const { body } = req;
    const documentName = body.name;
    const documentId = req.params.id;
    const document = await updateDocument( documentId, documentName );
    return res.status(StatusCodes.OK).json(document);

  } catch(error){
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });

  }
}