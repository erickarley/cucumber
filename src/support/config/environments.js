import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' }); // Make sure to load it early

export const properties = {
    server: process.env.SERVER_URL || '',      // Default to '' if missing
    user: process.env.SERVER_USER || '',
    password: process.env.SERVER_PASSWORD || '',
};

export default properties;
