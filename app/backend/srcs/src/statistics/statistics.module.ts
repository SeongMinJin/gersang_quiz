import { Module } from '@nestjs/common';
import { StasticsController } from './statistics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticsService } from './statistics.service';
import Statistics from './entity/statistics.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Statistics]),
	],
  controllers: [StasticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
