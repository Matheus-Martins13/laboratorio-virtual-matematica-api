import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { PersonModule } from 'src/person/person.module';
import { ProfileEntity } from 'src/db/entities/profile.entity';
import { ProfilePictureEntity } from 'src/db/entities/profile-picture.entity';

@Module({
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([UserEntity, ProfileEntity, ProfilePictureEntity]),
    PersonModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
