import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { getAllDocuments } from '../../services/documentServices';

export default async function getAllDocumentsController(req: Request, res: Response) {
  try{

    const projectId = req.query.projectId as string;
    const document = await getAllDocuments( projectId );
    return res.status(StatusCodes.OK).json(document);

  } catch(error){
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });

  }
}