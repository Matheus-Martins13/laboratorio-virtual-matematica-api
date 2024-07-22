import { PrismaService } from 'src/prisma/prisma.service';

export const findByEmail = async (email: string, prisma: PrismaService) => {
  const userFound = await prisma.user.findUnique({
    where: { email },
    include: {
      profile: {
        select: { type: true },
      },
    },
  });

  if (!userFound) return null;

  return userFound;
};
