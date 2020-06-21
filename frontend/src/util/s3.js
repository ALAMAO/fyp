import AWS from "aws-sdk";

var config = new AWS.Config({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_REGION,
});
var s3 = new AWS.S3(config);

// takes in file

export const uploadS3 = (file, key) => {
  return new Promise(async (resolve, reject) => {
    const result = await s3
      .upload({
        Key: key,
        Bucket: process.env.REACT_APP_BUCKET,
        Body: file,
      })
      .promise();

    resolve(result);
  });
};

export const downloadS3 = (key) => {
  return new Promise(async (resolve, reject) => {
    const params = {
      Bucket: process.env.REACT_APP_BUCKET,
      Key: key,
    };

    const s3Stream = await s3.getObject(params).promise();
    
    resolve(s3Stream)
  });
};
