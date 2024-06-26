import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'profile' })
export class ProfileEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id_profile' })
  idProfile?: string;

  @Column({ type: 'varchar' })
  type: string;
}
