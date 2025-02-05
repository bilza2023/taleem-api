
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    endpoint: `https://${process.env.SPACES_ENDPOINT}`,

    accessKeyId: process.env.SPACES_KEY,

    secretAccessKey: process.env.SPACES_SECRET

});

const listFiles = async (bucket, folder) => {
    const params = { Bucket: bucket, Prefix: folder };

    try {
        const data = await s3.listObjectsV2(params).promise();
        return data.Contents
            .map(obj => obj.Key)
            .filter(key => key !== folder)  // Remove folder entry
            .map(key => key.replace(folder, ''));  // Remove folder prefix
    } catch (err) {
        console.error('Error fetching file list:', err);
        throw err;
    }
};

module.exports = { listFiles };
