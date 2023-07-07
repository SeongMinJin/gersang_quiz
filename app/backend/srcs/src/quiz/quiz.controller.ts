import { Controller, Get, Req, Res } from '@nestjs/common';

@Controller('quiz')
export class QuizController {

	@Get()
	async get(@Req() req, @Res({passthrough: true}) res) {
		return "??";
	}

}
