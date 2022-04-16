import { Request } from 'express';
export interface AwsFile {
  name: string;
  size: number;
  type: string;
  extension: string;
  content: ArrayBuffer
}

export interface UploadedFile {
  path: string;
}

export interface FileRequest extends Request {
  fileKey: string;
}
