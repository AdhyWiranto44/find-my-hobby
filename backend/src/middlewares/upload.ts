import { Storage } from '@google-cloud/storage';
import path from 'path';

const pathKey = path.resolve('./googlecloudkey.json')

const gcs = new Storage({
    projectId: process.env.GCP_PROJECT_ID,
    keyFilename: pathKey
});

const bucketName: any = process.env.GCP_BUCKET_NAME;
const bucket = gcs.bucket(bucketName);

function getPublicUrl(filename: any) {
    return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
}

let ImgUpload: any = {};

ImgUpload.uploadToGcs = (req: any, res: any, next: any) => {
    if (!req.file) return next();

    const date = Date.now();
    const randNum = Math.floor(Math.random() * 1000);
    const gcsname = `hobby-${date}-${randNum}.jpg`;
    const file = bucket.file(gcsname);

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    });

    stream.on('error', (err: any) => {
        req.file.cloudStorageError = err;
        next(err);
    });

    stream.on('finish', () => {
        req.file.cloudStorageObject = gcsname;
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
        next();
    })

    stream.end(req.file.buffer);
}

export default ImgUpload;