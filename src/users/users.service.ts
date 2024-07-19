// imports nestjs
import { Injectable } from '@nestjs/common';

// imports libs terceiras
import { hashSync as bcryptHashSync } from 'bcrypt';

// imports dto
import { UserDto } from './user.dto';

// imports services
import { removeImage } from 'src/utils/remove-image.util';
import { PrismaService } from 'src/prisma/prisma.service';
import { validateData } from './utils/validate-data.util';
import { validateProfileTypeAndPicture } from './utils/validate-profile-type-and-picture';
import { findByEmail } from './utils/find-by-email.util';
import { findByCpf } from './utils/find-by-cpf.utils';
import { findByPhoneNumber } from './utils/find-by-phone-number.utl';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(newUser: UserDto, photo?: Express.Multer.File) {
    // Config profile type and picture
    const { profileType, profilePicture } = validateProfileTypeAndPicture(
      newUser,
      photo,
    );
    newUser.profileType = profileType;
    newUser.profilePicture = profilePicture;
    newUser.birthday = new Date(newUser.birthday);

    await validateData(newUser, this.prisma);

    // Config password
    const passwordHash = bcryptHashSync(newUser.password, 10);
    newUser.password = passwordHash;

    try {
      const userSaved = await this.prisma.user.create({
        data: {
          email: newUser.email,
          passwordHash: newUser.password,
          profile: {
            create: {
              type: newUser.profileType,
            },
          },
          profilePicture: {
            create: newUser.profilePicture,
          },
          person: {
            create: {
              name: newUser.name,
              cpf: newUser.cpf,
              birthday: newUser.birthday,
              address: {
                create: {
                  estado: newUser.estado,
                  cidade: newUser.cidade,
                  bairro: newUser.bairro,
                  cep: newUser.cep,
                  logradouro: newUser.logradouro,
                  numero: newUser.numero,
                  complemento: newUser.complemento,
                },
              },
              contact: {
                create: {
                  phone: newUser.phone,
                },
              },
            },
          },
        },
      });
      return userSaved;
    } catch (err) {
      removeImage(profilePicture.path);
      throw err;
    }
  }

  async findByEmail(email: string) {
    return await findByEmail(email, this.prisma);
  }

  async findByCpf(cpf: string) {
    return await findByCpf(cpf, this.prisma);
  }

  async findByPhoneNumber(phone: string) {
    return await findByPhoneNumber(phone, this.prisma);
  }
}
