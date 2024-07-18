import { PrismaService } from 'src/prisma/prisma.service';

export const findByPhoneNumber = async (
  phoneNumber: string,
  prisma: PrismaService,
) => {
  const personFound = await prisma.person.findMany({
    where: {
      contact: {
        phone: phoneNumber,
      },
    },
  });

  if (!personFound) return null;

  return personFound[0];
};
