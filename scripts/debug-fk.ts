import { prisma } from './src/db';

async function main() {
  const users = await prisma.user.findMany({
    select: { id: true, email: true }
  });
  console.log("Users in DB:");
  console.log(users);

  // Check if we can create a patient profile for superadmin
  const superadmin = users.find(u => u.email === 'superadmin@bloodpanda.com');
  if (superadmin) {
    console.log("Found superadmin with ID:", superadmin.id);
    try {
      const p = await prisma.patientProfile.create({
        data: {
          userId: superadmin.id,
          name: "Test Admin",
          email: "superadmin@bloodpanda.com",
          phone: "9999999999",
          gender: "MALE",
          age: "30"
        }
      });
      console.log("Successfully created test patient profile:", p.id);
      await prisma.patientProfile.delete({ where: { id: p.id } });
    } catch (e: any) {
      console.error("Error creating profile:", e.message);
    }
  }
}
main().finally(() => prisma.$disconnect());
