export default {
  accessKeyId: String(process.env.BUCKETEER_AWS_ACCESS_KEY_ID),
  region: String(process.env.BUCKETEER_AWS_REGION),
  secretAccessKey: String(process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY),
  bucketName: String(process.env.BUCKETEER_BUCKET_NAME),
}