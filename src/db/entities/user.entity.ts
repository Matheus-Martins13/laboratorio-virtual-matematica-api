import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { ProfilePictureEntity } from './profile-picture.entity';
import { ObjectEntity } from './object.entity';
import { PersonEntity } from './person.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id_user' })
  idUser?: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', name: 'password_hash' })
  passwordHash: string;

  @Column({ type: 'varchar' })
  status?: string;

  @OneToOne(() => PersonEntity)
  @JoinColumn({ name: 'id_person' })
  person: PersonEntity;

  @OneToOne(() => ProfileEntity)
  @JoinColumn({ name: 'id_profile' })
  profile: ProfileEntity;

  @OneToOne(() => ProfilePictureEntity)
  @JoinColumn({ name: 'id_profile_picture' })
  profilePicture: ProfilePictureEntity;

  @ManyToMany(() => ObjectEntity, (obj) => obj.favoriteUsers)
  @JoinTable()
  favoriteObjects?: ObjectEntity[];

  @ManyToMany(() => ObjectEntity, (obj) => obj.objectUsers)
  @JoinTable()
  userObjects?: ObjectEntity[];

  @ManyToMany(() => ObjectEntity, (obj) => obj.commentUsers)
  @JoinTable()
  commentObjects?: ObjectEntity[];
}
