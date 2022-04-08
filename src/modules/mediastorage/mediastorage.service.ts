import S3 from 'aws-sdk/clients/s3';
import s3Config from '../../config/s3Config';
import { AwsFile, UploadedFile } from './mediastorage.interface';

const s3Client = new S3({
  accessKeyId: s3Config.accessKeyId,
  secretAccessKey: s3Config.secretAccessKey,
  region: s3Config.region,
});

function generateFileKey(file: AwsFile, timestamp: number): string {
  return `${file.name}-${timestamp}.${file.extension}`;
}

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

  return `${bucketName}/${fileKey}`;
}

export async function getUploadedFile(file: UploadedFile) {
  const { bucketName } = s3Config;
  const data = await s3Client.getObject({
    Bucket: bucketName,
    Key: file.path
  }).promise();
  return data.Body;
}
