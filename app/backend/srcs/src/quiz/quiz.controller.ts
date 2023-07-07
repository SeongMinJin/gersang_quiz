import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller("quiz")
export class QuizController {

	constructor(
		private quizService: QuizService
	){}

	@Get()
	async get() {
		return await this.quizService.findAll();
	}

}
