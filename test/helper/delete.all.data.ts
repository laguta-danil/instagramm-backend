import { PrismaClient } from '@prisma/client';

export const deleteAllData = async (prisma: PrismaClient) => {
  await prisma.user.deleteMany({});
  await prisma.usersConfirmEmail.deleteMany({});
};
