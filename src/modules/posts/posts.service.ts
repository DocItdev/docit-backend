import Post from "./posts.model";

export async function createPost(
  DocumentId: string,
  postType: string,
  title: string,
  description: string,
  textContent: string
) {
  const returnPost = await Post.create({
    postType,
    title,
    description,
    textContent,
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

export async function deletePost(id: string, DocumentId: string) {
  const returnPost = await Post.destroy({
    where: {
      id,
      DocumentId,
    },
  });
  return returnPost;
}
