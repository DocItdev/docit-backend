import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { getAllPosts } from 'src/services/postServices';

export default async function getAllPostsController(req: Request, res: Response) {
  try{
    
    const documentId:string = req.query.doc_id as string;
    const posts = await getAllPosts(
        documentId
    );

    return res.status(StatusCodes.OK).json(posts);

  } catch(error){
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });

  }
}