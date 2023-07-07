import Quiz from "src/quiz/entity/quiz.entity";
import Selection from "src/selection/entity/selection.entity";
import { MIME } from "src/type";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Problem {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: true,
	})
	title: string;

	@Column({
		enum: MIME,
	})
	type: MIME;

	@Column({
		type: "blob",
		nullable: true,
	})
	buffer: Blob;

	@ManyToOne(() => Quiz, (quiz: Quiz) => quiz.problems)
	quiz: Quiz;

	@OneToOne(() => Selection)
	@JoinColumn()
	answer: Selection;

	@OneToMany(() => Selection, (selection: Selection) => selection.problem)
	selections: Selection[];
}