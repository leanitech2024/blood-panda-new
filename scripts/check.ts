process.env.DATABASE_URL = process.env.PROD_DATABASE_URL;
import { prisma } from './src/db';

async function main() {
  const users = await prisma.user.findMany();
  console.log("Users in Prod DB:", users.length);
  for (const u of users) {
    console.log("-", u.email);
  }
}

main().finally(() => prisma.$disconnect());
