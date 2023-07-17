import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Statistics {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: false,
		type: "json"
	})
	status: {
		data: {
			quiz: {
				type: string,
				answer: string,
				selection: string[]
			},
			correct: boolean
		}[]
	}
}