import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';

// many to many rn
// user <-> upvote posts
// several users can upvote the same post
// users can also upvote many posts

@Entity()
export class Updoot extends BaseEntity {
  @Column({ type: 'int' })
  value!: number;

  @PrimaryColumn({ type: 'uuid' })
  userId!: string;

  @PrimaryColumn({ type: 'uuid' })
  postId!: string;

  @ManyToMany(() => User, (user) => user.updoots, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId', foreignKeyConstraintName: 'user_fk', referencedColumnName: 'id' })
  user!: User;

  @ManyToMany(() => Post, (post) => post.updoots, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postId', foreignKeyConstraintName: 'post_fk', referencedColumnName: 'id' })
  post!: Post;

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;
}
