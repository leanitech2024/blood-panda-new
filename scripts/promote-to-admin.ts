process.env.DATABASE_URL = process.env.PROD_DATABASE_URL;
import { prisma } from './src/db';

async function main() {
  const email = 'superadmin@bloodpanda.com';
  
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.error(`User ${email} not found! Please register this account on the live site first.`);
      return;
    }
    
    await prisma.user.update({
      where: { email },
      data: {
        role: 'SUPER_ADMIN',
        emailVerified: true
      }
    });
    console.log(`Successfully promoted ${email} to SUPER_ADMIN!`);
  } catch (error) {
    console.error('Error promoting user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
