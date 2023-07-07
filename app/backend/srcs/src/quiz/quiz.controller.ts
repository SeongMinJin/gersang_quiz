import { Controller, Get, Param, Req, Res } from '@nestjs/common';

@Controller("quiz")
export class QuizController {

	@Get()
	async get() {
	}

}
