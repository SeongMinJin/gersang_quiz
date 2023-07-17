import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Statistics from './entity/statistics.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatisticsService {

	constructor(

		@InjectRepository(Statistics)
		private statisticsRepository: Repository<Statistics>
	) { }

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
		const newStatistics = this.statisticsRepository.create({
			status: body
		});

		await this.statisticsRepository.save(newStatistics)
	}
}
