import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const config = {
  DB_ATLAS_URI: process.env.DB_ATLAS_URI,
  API_VERSION: process.env.API_VERSION,
};

export default config;