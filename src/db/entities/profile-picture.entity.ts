import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'profile_picture' })
export class ProfilePictureEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id_profile_picture' })
  idProfilePicture?: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  path: string;
}
