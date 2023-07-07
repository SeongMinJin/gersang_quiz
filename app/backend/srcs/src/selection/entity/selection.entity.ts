import Problem from "src/problem/entity/problem.entity";
import { MIME } from "src/type";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Selection {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: true,
	})
	title: string;

	@Column({
		enum: MIME,
	})
	type: MIME

	@Column({
		type: "bytea",
		nullable: true,
	})
	buffer: Buffer

	@ManyToOne(() => Problem, (problem: Problem) => problem.selections)
	problem: Problem;
}