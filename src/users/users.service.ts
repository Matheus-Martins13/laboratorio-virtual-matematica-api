// imports nestjs
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

// imports libs terceiras
import { hashSync as bcryptHashSync } from 'bcrypt';

// imports db
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from 'src/db/entities/user.entity';
import { ProfileEntity } from 'src/db/entities/profile.entity';
import { ProfilePictureEntity } from 'src/db/entities/profile-picture.entity';
import typeOrmMigrationConfig from 'src/db/typeOrm.migration-config';

// imports dto
import {
  ProfileExtracted,
  ProfilePictureExtracted,
  UserDto,
  UserExtracted,
} from './user.dto';
import { PersonDto } from 'src/person/person.dto';

// imports services
import { PersonService } from 'src/person/person.service';
import { removeImage } from 'src/utils/remove-image.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    @InjectRepository(ProfilePictureEntity)
    private readonly profilePictureRepository: Repository<ProfilePictureEntity>,
    private readonly personService: PersonService,
  ) {}

  async create(newUser: UserDto, photo?: Express.Multer.File) {
    // Config profile picture
    const { profileType, profilePicture } = this.validateProfileTypeAndPicture(
      newUser,
      photo,
    );
    newUser.profileType = profileType;
    newUser.profilePicture = profilePicture;

    await this.validateData(newUser);

    // Config password
    const passwordHash = bcryptHashSync(newUser.password, 10);
    newUser.password = passwordHash;

    // Config data
    const [person, user, profile] = UserDto.destructingUserDto(newUser);

    // Save
    const userCompose = await this.transactionSaveUser(
      person,
      user,
      profile,
      newUser.profilePicture,
    );

    return userCompose;
  }

  private validateProfileTypeAndPicture(
    newUser: UserDto,
    photo: Express.Multer.File,
  ) {
    if (!newUser.profileType) newUser.profileType = 'ALUNO';

    if (!photo) {
      newUser.profilePicture = {
        name: `default-picture-${newUser.name}`,
        path: '/users/default-profile-picture.png',
      };
    } else {
      newUser.profilePicture = {
        name: photo.filename,
        path: photo.path.replace('public/', ''),
      };
    }

    return {
      profileType: newUser.profileType,
      profilePicture: newUser.profilePicture,
    };
  }

  async findByEmail(email: string) {
    const userFound = await this.userRepository.findOne({
      where: { email },
    });

    if (!userFound) return null;

    return userFound;
  }

  private async validateData(newUser: UserDto): Promise<void> {
    if (!newUser.email || !newUser.password) {
      throw new BadRequestException(['Required data: email and password']);
    }

    const userAlreadyRegistered = await this.findByEmail(newUser.email);

    if (userAlreadyRegistered) {
      removeImage(newUser.profilePicture.path);
      throw new ConflictException([
        `User with email '${newUser.email}' already registered`,
      ]);
    }
  }

  private async transactionSaveUser(
    person: PersonDto,
    user: UserExtracted,
    profile: ProfileExtracted,
    profilePicture: ProfilePictureExtracted,
  ) {
    const queryRunner = typeOrmMigrationConfig.createQueryRunner();
    // await queryRunner.connect();

    await queryRunner.startTransaction();
    try {
      const personSaved = await this.personService.create(person);

      const profileSaved: ProfileEntity =
        await this.profileRepository.save(profile);

      const profilePictureSaved =
        await this.profilePictureRepository.save(profilePicture);

      const dbUser: UserEntity = {
        email: user.email,
        passwordHash: user.password,
        person: personSaved,
        profile: profileSaved,
        profilePicture: profilePictureSaved,
      };

      const userSaved = await this.userRepository.save(dbUser);

      const userCompose = UserDto.userStructuring(
        person,
        userSaved,
        profile,
        profilePicture,
      );
      await queryRunner.commitTransaction();
      return userCompose;
    } catch (error) {
      removeImage(profilePicture.path);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  // async remove(id: string) {
  //   const result = await this.userRepository.delete(id);

  //   if (!result.affected) {
  //     throw new HttpException(
  //       `User with id '${id}' not found`,
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }
  // }
}
