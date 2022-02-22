import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { deleteDocument } from '../../services/documentServices';

export default async function deleteDocumentController(req: Request, res: Response) {
  try{

    const documentId: string = req.params.id;
    const document = await deleteDocument( documentId );
    return res.status(StatusCodes.OK).json(document);

  } catch(error){
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });

  }
}