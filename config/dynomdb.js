import dotenv from 'dotenv';

dotenv.config();

const DynomdbConfig = {
    region: process.env.AWS_REGION,
    endpoint: process.env.AWS_ENDPOINT,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

export default DynomdbConfig;
