import { PostIndex, PostObject } from "./posts.interface";
import Post from "./posts.model";

export async function createPost(
  DocumentId: string,
  postObject: PostObject
) {
  const returnPost = await Post.create({
    ...postObject,
    DocumentId,
  });
  await returnPost.save();
  return returnPost;
}

export async function getAllPosts(DocumentId: string) {
  const returnPosts = await Post.findAll({
    where: {
      DocumentId,
    },
    order:[['index', 'ASC']]
  });
  return returnPosts;
}

export async function updatePost(
  id: string,
  DocumentId: string,
  postType: string,
  title: string,
  description: string,
  textContent: string
) {
  const returnPost = await Post.update(
    {
      postType,
      title,
      description,
      textContent,
    },
    {
      where: {
        id,
        DocumentId,
      },
    }
  );
  return returnPost;
}

export async function bulkUpdate(DocumentId: string, posts: PostIndex[]) {
  const statements: Promise<[number, Post[]]>[] = [];
  for(let i = 0; i < posts.length; i++) {
    statements.push(Post.update(
      { index: posts[i].index },
      { where: { id: posts[i].id, DocumentId  } }))
  }
  const results = await Promise.all(statements);
  return results;
}

export async function deletePost(id: string, DocumentId: string) {
  const returnPost = await Post.destroy({
    where: {
      id,
      DocumentId,
    },
  });
  return returnPost;
}
