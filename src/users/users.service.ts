import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { ContactEntity } from 'src/db/entities/contact.entity';
import { AddressEntity } from 'src/db/entities/address.entity';
import { PersonEntity } from 'src/db/entities/person.entity';
import { ProfileEntity } from 'src/db/entities/profile.entity';
import { ProfilePictureEntity } from 'src/db/entities/profile-picture.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly contactRepository: Repository<ContactEntity>,
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly personRepository: Repository<PersonEntity>,
    private readonly profileRepository: Repository<ProfileEntity>,
    private readonly profilePictureRepository: Repository<ProfilePictureEntity>,
  ) {}

  async create(newUser: UserDto) {
    const userAlreadyRegistered = await this.findByUserName(newUser.email);

    if (userAlreadyRegistered) {
      throw new ConflictException(`User '${newUser.email}' already registered`);
    }

    const dbUser = new UserEntity();
    dbUser.email = newUser.email;
    dbUser.passwordHash = bcryptHashSync(newUser.password, 10);

    const { idUser, email } = await this.userRepository.save(dbUser);

    return { idUser, email };
  }

  async findByUserName(email: string): Promise<UserDto | null> {
    const userFound = await this.userRepository.findOne({
      where: { email },
    });

    if (!userFound) return null;

    return {
      idUser: userFound.idUser,
      email: userFound.email,
      password: userFound.passwordHash,
      status: 'ATIVO',
      idProfile: v4(),
      idProfilePicture: v4(),
    };
  }

  async remove(id: string) {
    const result = await this.userRepository.delete(id);

    if (!result.affected) {
      throw new HttpException(
        `User with id '${id}' not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
