import S3 from 'aws-sdk/clients/s3';
import s3Config from '../../config/s3Config';
import { AwsFile, UploadedFile } from './mediastorage.interface';

const s3Client = new S3({
  accessKeyId: s3Config.accessKeyId,
  secretAccessKey: s3Config.secretAccessKey,
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
  await s3Client.putObject({
    Bucket: bucketName,
    Key: fileKey,
    ContentType: file.type,
    Body: file.content,
  }).promise();

  return fileKey;
}

/**
 * 
 * @param file object containing path or key of file
 * @returns 
 */
export async function getUploadedFile(file: UploadedFile) {
  const { bucketName } = s3Config;
  const data = await s3Client.getObject({
    Bucket: bucketName,
    Key: file.path
  }).promise();
  return data;
}

/**
 * 
 * @param file object containing path or key of file
 * @returns a string containing temporary download Url for specified file
 */

export function getDownloadUrl(file: UploadedFile): string {
  const { bucketName } = s3Config;
  const signedUrlExpireSeconds = 60 * 2; // 2min
  const url: string = s3Client.getSignedUrl('getObject', {
    Bucket: bucketName,
    Key: file.path,
    Expires: signedUrlExpireSeconds,
  });
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
  }).promise();
}
