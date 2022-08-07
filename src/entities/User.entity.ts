import { IsEmail, Length } from 'class-validator';
import {
  AfterLoad,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Length(2, 30)
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 30 })
  userName: string;

  @IsEmail()
  @Column({ type: 'varchar', length: 30 })
  email: string;

  @Column({ type: 'varchar', select: false })
  password?: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @AfterLoad()
  afterLoad() {
    console.log('after load ran here');
  }

  @BeforeInsert()
  beforeInsert() {
    console.log('before insert ran here');
  }
}
