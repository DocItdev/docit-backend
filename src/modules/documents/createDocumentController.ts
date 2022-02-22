import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { createDocument } from '../../services/documentServices';

export default async function createDocumentController(req: Request, res: Response) {
  try{
    const { body } = req;
    const documentName: string = body.name;
    const projectId:string = req.query.projectId as string;
    const document = await createDocument(
        projectId,
        documentName
    );

    return res.status(StatusCodes.OK).json(document);

  } catch(error){
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });

  }
}