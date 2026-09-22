import { prisma } from './src/db';

async function main() {
  console.log("DATABASE_URL being used:", process.env.DATABASE_URL);
  const users = await prisma.user.findMany();
  console.log("Users in app DB:", users.length);
  for (const u of users) {
    console.log("-", u.email, u.role);
  }
}
main().finally(() => prisma.$disconnect());
