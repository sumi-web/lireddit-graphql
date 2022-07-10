import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
	@PrimaryGeneratedColumn()
	id: number;
	@Column({ length: 100 })
	name: string;

	@Column("text")
	description: string;

	@Column("double precision")
	views: number;
	@Column()
	createdAt: Date;
	@Column()
	updateAt: Date;
}
