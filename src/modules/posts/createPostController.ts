import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { createPost } from 'src/services/postServices';

export default async function createPostController(req: Request, res: Response) {
  try{
    const { body } = req;
    const postType: string = body.postType;
    const title: string = body.title;
    const textContent: string = body.textContent;
    const description: string = body.description;
    const documentId:string = req.query.doc_id as string;
    const document = await createPost(
        documentId,
        postType,
        title,
        description,
        textContent
    );

    return res.status(StatusCodes.OK).json(document);

  } catch(error){
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });

  }
}