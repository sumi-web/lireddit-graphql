import { IsEmail, Length } from "class-validator";
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: number;

	@Length(2, 30)
	@Column({ type: "varchar", length: 30 })
	name: string;

	@IsEmail()
	@Column({ type: "varchar", length: 30 })
	email: string;

	@CreateDateColumn()
	createdDate: Date;

	@UpdateDateColumn()
	updatedDate: Date;
}
