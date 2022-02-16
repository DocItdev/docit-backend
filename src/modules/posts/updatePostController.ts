import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { updatePost } from 'src/services/postServices';

export default async function updatePostController(req: Request, res: Response) {
  try{
    const { body } = req;
    const postId = req.params.id;
    const postType = body.postType;
    const title = body.title;
    const textContent = body.textContent;
    const description = body.description;
    const documentId:string = req.query.doc_id as string;
    const document = await updatePost(
        postId,
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