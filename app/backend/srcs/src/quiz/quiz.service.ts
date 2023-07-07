import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
		return await this.quizRepository.find();
	}
}
