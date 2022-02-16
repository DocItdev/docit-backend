import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { deletePost, updatePost } from 'src/services/postServices';

export default async function deletePostController(req: Request, res: Response) {
  try{
    
    const postId = req.params.id;
    const documentId:string = req.query.doc_id as string;
    const document = await deletePost(
        postId,
        documentId
    );

    return res.status(StatusCodes.OK).json(document);

  } catch(error){
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });

  }
}