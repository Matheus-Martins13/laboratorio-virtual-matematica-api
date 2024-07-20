import { ConflictException } from '@nestjs/common';
import { UserDto } from '../user.dto';
import { removeImage } from 'src/utils/remove-image.util';
import { findByEmail } from './find-by-email.util';
import { PrismaService } from 'src/prisma/prisma.service';
import { findByCpf } from './find-by-cpf.utils';
import { findByPhoneNumber } from './find-by-phone-number.utl';

export const validateData = async (newUser: UserDto, prisma: PrismaService) => {
  const userAlreadyRegistered = await findByEmail(newUser.email, prisma);
  const cpfAlreadyRegistered = await findByCpf(newUser.cpf, prisma);
  const phoneAlreadyRegistered = await findByPhoneNumber(newUser.phone, prisma);

  if (userAlreadyRegistered) {
    removeImage(newUser.profilePicture.path);
    throw new ConflictException([
      `User with email '${newUser.email}' already registered`,
    ]);
  }

  if (cpfAlreadyRegistered) {
    throw new ConflictException([
      `User with cpf '${newUser.cpf}' already registered`,
    ]);
  }

  if (phoneAlreadyRegistered) {
    throw new ConflictException([
      `User with phone '${newUser.phone}' already registered`,
    ]);
  }
};
