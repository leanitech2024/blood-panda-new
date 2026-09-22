import { execSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

console.log('Pushing schema to Production DB...');
process.env.DATABASE_URL = process.env.PROD_DATABASE_URL;

try {
  execSync('npx prisma db push', { stdio: 'inherit', env: process.env });
  console.log('Production database schema is now up to date!');
} catch (error) {
  console.error('Failed to push to production DB.');
}
