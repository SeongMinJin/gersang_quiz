import Problem from "src/problem/entity/problem.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Quiz {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: false,
	})
	title: string;

	@Column({
		nullable: false,
	})
	description: string;

	@Column({
		type: "bytea",
		nullable: false,
	})
	thumbnail: Buffer

	@OneToMany(() => Problem, (problem: Problem) => problem.quiz)
	problems: Problem[];
}