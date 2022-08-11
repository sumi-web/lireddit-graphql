import { IsEmail, Length, validate, validateOrReject } from 'class-validator';
import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

async function preSave(that: User) {
  const errors = await validate(that, {
    validationError: {
      target: false,
      value: false
    }
  });

  if (errors.length > 0) {
    throw new Error(JSON.stringify(errors));
  }

  validateOrReject(that).catch((errors) => {
    console.log('Promise rejected (validation failed). Errors: ', errors);
    throw new Error(errors);
  });
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Length(2, 30)
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 30 })
  userName!: string;

  @IsEmail()
  @Column({ type: 'varchar', length: 30 })
  email!: string;

  @Column({ type: 'varchar', select: false })
  password?: string;

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;

  @AfterLoad()
  afterLoad() {
    console.log('after load ran here');
  }

  @BeforeInsert()
  async beforeSave() {
    return preSave(this);
  }

  @BeforeUpdate()
  async beforeUpdate() {
    return preSave(this);
  }
}
