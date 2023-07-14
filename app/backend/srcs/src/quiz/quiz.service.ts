import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeLevelColumn } from 'typeorm';
import { ProblemService } from '../problem/problem.service';
import Quiz from './entity/quiz.entity';

@Injectable()
export class QuizService {
	constructor(
		private problemService: ProblemService,

		@InjectRepository(Quiz)
		private quizRepository: Repository<Quiz>
	){}

	async findAll() {
		const quizs = await this.quizRepository.find();
		return quizs;
	}

	async findOneByTitle(title: string) {
		return await this.quizRepository.findOneBy({
			title: title,
		});
	}

	async findOneById(id: number) {
		return await this.quizRepository.findOneBy({
			id: id
		});
	}

	async create(buffer: Buffer, title: string, description: string) {

		if (!title) {
			throw new HttpException({
				success: false,
				message: "Title 프로퍼티를 입력해주세요."
			}, HttpStatus.BAD_REQUEST)
		}

		if (await this.findOneByTitle(title)) {
			throw new HttpException({
				success: false,
				message: "이미 존재하는 Quiz Title 입니다."
			}, HttpStatus.CONFLICT)
		}

		const newQuiz = this.quizRepository.create({
			title: title,
			thumbnail: buffer,
			description: description,
			problems: [],
		});

		await this.quizRepository.save(newQuiz);

		

		return {
			success: true,
			data: await this.findAll(),
		}
	}
}
