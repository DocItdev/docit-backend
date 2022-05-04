// import S3 from 'aws-sdk/clients/s3';
import { S3, GetObjectCommand } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Config from '../../config/s3Config';
import { AwsFile, UploadedFile } from './mediastorage.interface';

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
export async function uploadFile(file: AwsFile): Promise<string> {
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

  return fileKey;
}

/**
 * 
 * @param file object containing path or key of file
 * @returns object with metadata and stats of file
 */
export async function headUploadedFile(file: UploadedFile) {
  const { bucketName } = s3Config;
  const data = await s3Client.headObject({
    Bucket: bucketName,
    Key: file.path
  });
  return data;
}

export async function getUploadedFile (file: UploadedFile) {
  const { bucketName } = s3Config;
  const response = await s3Client.getObject({
    Bucket: bucketName,
    Key: file.path
  })
  return response;
}

/**
 * 
 * @param file object containing path or key of file
 * @returns a string containing temporary download Url for specified file
 */

export async function getDownloadUrl(file: UploadedFile): Promise<string> {
  const { bucketName } = s3Config;
  const signedUrlExpireSeconds = 60 * 60 * 24; // 24h
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: file.path,
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
export async function deleteUploadedFile(file: UploadedFile) {
  const { bucketName } = s3Config;
  await s3Client.deleteObject({
    Bucket: bucketName,
    Key: file.path,
  });
}
