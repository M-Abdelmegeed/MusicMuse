const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

const getObjectUrl = async (bucketName, objectKey) => {
  const s3 = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const command = new GetObjectCommand({ Bucket: bucketName, Key: objectKey });
  const response = await s3.send(command);
  const url =
    response["Body"]["socket"]["servername"] +
    response["Body"]["socket"]["parser"]["outgoing"]["path"].split("?")[0];
  return url;
};

module.exports = getObjectUrl;
