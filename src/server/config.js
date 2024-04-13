import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const envVariables = ['DB_ATLAS_URI', 'API_VERSION', 'ACCESS_TOKEN_SECRET', 'REFRESH_TOKEN_SECRET'];

// auto generate config object
const config = {}; 
for (const variable of envVariables) {
  config[variable] = process.env[variable];
}

export const { DB_ATLAS_URI, API_VERSION, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = config;