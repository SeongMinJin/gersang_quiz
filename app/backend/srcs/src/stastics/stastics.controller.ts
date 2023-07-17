import { Body, Controller, HttpCode, Post } from '@nestjs/common';

@Controller('stastics')
export class StasticsController {


	@Post()
	@HttpCode(201)
	async save(@Body() body: {
		quiz: {
			type: string,
			answer: string,
			selection: string[]
		},
		correct: boolean
	}[]) {
		console.log(body);
	}
}
