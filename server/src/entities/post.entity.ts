import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  title!: string;

  @Column({ type: 'varchar', length: 500 })
  text!: string;

  @Column({ type: 'int', default: 0 })
  points!: number;

  @Column('uuid')
  userId!: string;

  @ManyToMany(() => User, (user) => user.posts)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;
}
