import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';

@Module({
	imports: [],
	controllers: [QuizController],
	providers: [],
	exports: [],
})
export class QuizModule {}
