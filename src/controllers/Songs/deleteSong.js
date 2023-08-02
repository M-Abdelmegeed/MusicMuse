const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const Song = require("../../models/Song");
require("dotenv").config();

const deleteSong = async (req, res) => {
  const s3 = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
  const body = req.body;
  const filename = body.filename;
  const params = {
    Bucket: "mymusic10",
    Key: filename,
  };
  console.log(filename);
  try {
    await s3.send(new DeleteObjectCommand(params));
    console.log(
      `Object with key "${filename}" deleted successfully from mymusic10`
    );
    Song.deleteMany({ objectName: filename }, function (err) {
      if (err) return handleError(err);
    });
    res.send(
      `Object with key "${filename}" deleted successfully from mymusic10`
    );
  } catch (error) {
    res.status(400);
    console.error("Error deleting object:", error);
  }
};
module.exports = deleteSong;
