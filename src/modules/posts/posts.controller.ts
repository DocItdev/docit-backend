import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { pErr } from '../../shared/functions';
import { PostIndex } from './posts.interface';
import { createPost, getAllPosts, deletePost, updatePost, bulkUpdate } from './posts.service';

export async function createPostController(req: Request, res: Response) {
  try{
    const { body } = req;
    const postType: string = body.postType;
    const title: string = body.title;
    const textContent: string = body.textContent;
    const description: string = body.description;
    const documentId:string = req.query.doc_id as string;
    const index: number = body.index;
    const document = await createPost(
        documentId,
        {
          postType,
          title,
          description,
          textContent,
          index,
        }
    );

    return res.status(StatusCodes.OK).json(document);

  } catch(error){
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });

  }
}

export async function getAllPostsController(req: Request, res: Response) {
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

export async function deletePostController(req: Request, res: Response) {
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

export async function updatePostController(req: Request, res: Response) {
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
    pErr(error);
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });

  }
}

export async function bulkUpdatePostController(req: Request, res: Response) {
  try {
    const { body } = req;
    const docId: string = body.docId;
    const postIndexes: PostIndex[] = body.postIndexes;
    const results = await bulkUpdate(docId, postIndexes);
    res.status(StatusCodes.OK).json(results);
  } catch(error) {
    pErr(error);
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}
