import { PrismaService } from 'src/prisma/prisma.service';

export const findByCpf = async (cpf: string, prisma: PrismaService) => {
  const personFound = await prisma.person.findUnique({
    where: { cpf },
  });

  if (!personFound) return null;

  return personFound;
};
