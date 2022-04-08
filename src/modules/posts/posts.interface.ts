export interface PostIndex {
  id: string;
  index: number;
}

export interface PostObject {
  id?: string;
  postType: string;
  title?: string;
  description?: string;
  textContent?: string;
  index: number;
  mediaBlobUrl?: string;
}