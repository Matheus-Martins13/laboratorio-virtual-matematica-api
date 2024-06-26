import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { CategoryEntity } from './category';
import { TagEntity } from './tag.entity';

@Entity({ name: 'object' })
export class ObjectEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id_object' })
  idObject?: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @ManyToMany(() => UserEntity, (user) => user.favoriteObjects)
  favoriteUsers: UserEntity[];

  @ManyToMany(() => UserEntity, (user) => user.userObjects)
  objectUsers: UserEntity[];

  @ManyToMany(() => UserEntity, (user) => user.commentObjects)
  commentUsers: UserEntity[];

  @ManyToMany(() => CategoryEntity, (cat) => cat.objects)
  categories: [];

  @ManyToMany(() => TagEntity, (tag) => tag.objects)
  tags: [];
}
