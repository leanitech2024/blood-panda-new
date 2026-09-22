process.env.DATABASE_URL = process.env.PROD_DATABASE_URL;
import { prisma } from './src/db';

async function main() {
  console.log("Clearing ALL data from the Production database...");

  try {
    // Delete dependent records first to avoid foreign key constraint errors
    console.log('Deleting Notifications & AdminInvites...');
    await prisma.notification.deleteMany();
    await prisma.adminInvite.deleteMany();

    console.log('Deleting WebhookLogs...');
    await prisma.webhookLog.deleteMany();

    console.log('Deleting Prescriptions...');
    await prisma.prescription.deleteMany();

    console.log('Deleting Payments...');
    await prisma.payment.deleteMany();

    console.log('Deleting Schedules...');
    await prisma.schedule.deleteMany();

    console.log('Deleting Bookings (Orders)...');
    await prisma.booking.deleteMany();

    console.log('Deleting Members (Patients)...');
    await prisma.member.deleteMany();
    await prisma.patientProfile.deleteMany();

    console.log('Deleting Addresses...');
    await prisma.address.deleteMany();

    console.log('Deleting BetterAuth Auth Records (Sessions, Accounts, Verifications)...');
    await prisma.session.deleteMany();
    await prisma.account.deleteMany();
    await prisma.verification.deleteMany();

    console.log('Deleting ALL Users (Users, Phlebotomists, Admins, COOs)...');
    await prisma.user.deleteMany();

    console.log("==========================================");
    console.log("Production database completely cleared!");
    console.log("==========================================");
  } catch (error) {
    console.error('Error clearing production database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
