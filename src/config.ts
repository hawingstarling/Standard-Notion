import dotenv from 'dotenv';
import fs from 'fs';

const env = process.env.NODE_ENV || 'development';

const envFile = env === 'production' ? '.env.production' : '.env';

dotenv.config({ path: envFile });

// Mapper for environment variables
export const environment = process.env.NODE_ENV;
export const PUBLISHABLE_KEY = process.env.VITE_CLERK_PUBLISHABLE_KEY;