import bcrypt from 'bcrypt';
import process from 'process';
import { prisma } from '../src/lib/client.ts'

async function main() {
  // const hashedPassword = await bcrypt.hash('admin123', 12);
  
  // const admin = await prisma.user.create({
  //   data: {
  //     username: "admin",
  //     password: hashedPassword
  //   }
  // });
  
  // console.log('Seeding selesai! Admin dibuat:', admin.username);

  const book1 = await prisma.book.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "Belajar TypeScript Modern",
      author: "Pramana",
      price: 150000,
      description: "Panduan lengkap belajar TS dari nol.",
      imageUrl: "default-book.webp"
    },
  });

  console.log('Book data seeded:', book1.title);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });