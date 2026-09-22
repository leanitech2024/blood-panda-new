import { execSync } from 'child_process';

console.log('Starting Prisma Studio on Production DB...');
process.env.DATABASE_URL = process.env.PROD_DATABASE_URL;

try {
  execSync('npx prisma studio', { stdio: 'inherit', env: process.env });
} catch (error) {
  console.error('Prisma studio exited.');
}
