import { Module } from '@nestjs/common';
import { StasticsController } from './stastics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Stastics from './entity/stastics.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Stastics])
	],
  controllers: [StasticsController]
})
export class StasticsModule {}
