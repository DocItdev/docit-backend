// import S3 from 'aws-sdk/clients/s3';
import { S3, GetObjectCommand } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Config from '../../config/s3Config';
import { AwsFile, FileRecordType } from './mediastorage.interface';
import { FileRecord } from './mediastorage.model';

const s3Client = new S3({
  credentials: {
    accessKeyId: s3Config.accessKeyId,
    secretAccessKey: s3Config.secretAccessKey,
  },
  region: s3Config.region,
});

/**
 * 
 * @param file 
 * @param timestamp 
 * @description uploads a media file to s3 bucket
 * @returns a unique name for file to be saved in S3
 */
function generateFileKey(file: AwsFile, timestamp: number): string {
  return `${file.name}-${timestamp}.${file.extension}`;
}

/**
 * 
 * @param file object containing required  parameters for upload
 * @description retrieves one media file from s3 bucket given file path or key
 * @returns name of uploaded file
 */
export async function uploadFile(file: AwsFile, DocumentId: string): Promise<FileRecordType> {
  const timestamp: number = Date.now();
  const { bucketName } = s3Config;
  const fileKey: string = generateFileKey(file, timestamp);
  const target = {
    Bucket: bucketName,
    Key: fileKey,
    ContentType: file.type,
    Body: file.content,
    Metadata: {
      originalName: file.metadata.originalName
    },
  }
  const parallelUpload = new Upload({
    client: s3Client,
    params: target,
  });
  await parallelUpload.done();
  const fileRecord = await FileRecord.create({
    key: fileKey,
    type: file.type,
    DocumentId: DocumentId,
  });
  return fileRecord;
}

export async function getFileRecords(DocumentId: string) {
  const fileRecord = await FileRecord.findAll({
    where: {
      DocumentId,
    }
  });
  return fileRecord;
}

/**
 * 
 * @param file object containing path or key of file
 * @returns object with metadata and stats of file
 */
export async function headUploadedFile(fileKey: string) {
  const { bucketName } = s3Config;
  const data = await s3Client.headObject({
    Bucket: bucketName,
    Key: fileKey
  });
  return data;
}

export async function getUploadedFile (fileKey: string) {
  const { bucketName } = s3Config;
  const response = await s3Client.getObject({
    Bucket: bucketName,
    Key: fileKey
  })
  return response;
}

/**
 * 
 * @param file object containing path or key of file
 * @returns a string containing temporary download Url for specified file
 */

export async function getDownloadUrl(fileKey: string): Promise<string> {
  const { bucketName } = s3Config;
  const signedUrlExpireSeconds = 60 * 60 * 24; // 24h
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: fileKey,
  });
  const url: string = await getSignedUrl(
    s3Client,
    command, 
    { expiresIn: signedUrlExpireSeconds }
  );
  return url;
}

/**
 * 
 * @param file 
 * @description deletes a file from the S3 bucket
 */
export async function deleteUploadedFile(fileKey: string) {
  const { bucketName } = s3Config;
  await s3Client.deleteObject({
    Bucket: bucketName,
    Key: fileKey,
  });
  const code = await FileRecord.destroy({
    where: {
      key: fileKey
    }
  });
  return code;
}

