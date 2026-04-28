const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function update() {
  const user = await prisma.user.update({
    where: { email: 'lotchansm1612@gmail.com' },
    data: { passwordHash: '.7QxL8WzR1mFj3eO5tZcB4sD9pE2fG7hJ6kL1mN8oP0qR' }
  });
  console.log('Updated:', user.email);
  await prisma.\();
}
update();
