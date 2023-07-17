import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StasticsController {
	constructor(
		private statisticsService: StatisticsService
	) {}

	@Post()
	@HttpCode(201)
	async save(@Body() body: {
		data: {
			quiz: {
				type: string,
				answer: string,
				selection: string[]
			},
			correct: boolean
		}[]
	}) {
		this.statisticsService.save(body)
	}
}
