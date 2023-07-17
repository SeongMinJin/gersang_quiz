import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Stastics {
	@PrimaryGeneratedColumn()
	id: number;


	@Column({
		nullable: false,
		type: "json"
	})
	status: JSON
}