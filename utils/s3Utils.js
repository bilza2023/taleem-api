
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    endpoint: 'https://blr1.digitaloceanspaces.com',
    accessKeyId: 'DO00KC8ZLNMJ6A3GFNMJ',
    secretAccessKey: 'aM3v7HFig4mXgZvObPR2UXBEAgICAFmI4P48cZTNmwE'
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
