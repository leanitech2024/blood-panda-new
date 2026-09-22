process.env.DATABASE_URL = process.env.PROD_DATABASE_URL;
import { auth } from './src/lib/auth';
import { prisma } from './src/db';

async function main() {
  const email = 'superadmin@bloodpanda.com';
  const password = 'vN7!qR2Lx9@Tz4$Wp8&Km6';

  console.log(`Creating superadmin for ${email}...`);

  try {
    // 1. Create the user with Better Auth (hashes password, creates account)
    // We pass a dummy request object since it might be expected
    const req = new Request('http://localhost:3000/api/auth/sign-up/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        name: 'Super Admin'
      })
    });

    const res = await auth.handler(req);
    const body = await res.json();

    if (!res.ok) {
        console.error('Failed to create account via auth handler:', body);
        // Let's try direct API if handler fails
        if (body.message?.includes('User already exists')) {
            console.log('User already exists, will just update password and role...');
        } else {
            return;
        }
    }

    // 2. The user is created as 'USER' because of the database hook. 
    // We need to update them to 'SUPER_ADMIN' using Prisma directly.
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
        await prisma.user.update({
            where: { email },
            data: {
                role: 'SUPER_ADMIN',
                emailVerified: true
            }
        });
        console.log(`Successfully updated ${email} to SUPER_ADMIN!`);
    }

    console.log('Done!');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
