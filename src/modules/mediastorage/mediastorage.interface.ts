export interface FileRecordType {
  id?: string;
  key: string;
  type: string;
  DocId?: string;
}

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
