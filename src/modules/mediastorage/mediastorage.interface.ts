export interface FileMetadata {
  originalName: string;
}

export interface AwsFile {
  name: string;
  size: number;
  type: string;
  extension: string;
  content: ArrayBuffer,
  metadata?: FileMetadata;
}

export interface UploadedFile {
  path: string;
}
