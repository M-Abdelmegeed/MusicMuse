const fs = require("fs");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

const uploadToS3 = async (bucketName, fileName, filePath) => {
  const s3 = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
  console.log(process.env.AWS_ACCESS_KEY_ID);
  const fileContent = fs.readFileSync(filePath);

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileContent,
  };

  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);
    console.log(
      `File uploaded successfully to S3: s3://${bucketName}/${fileName}`
    );
  } catch (error) {
    console.error("Error uploading file to S3:", error);
  }
};
uploadToS3(
  "mymusic10",
  "The Neighbourhood - The Beach (Audio).mp3",
  "C:/Users/DELL/Downloads/The Neighbourhood - The Beach (Audio).mp3"
);
module.exports = uploadToS3;
