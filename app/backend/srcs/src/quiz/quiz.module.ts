import { Module } from '@nestjs/common';
import { ProblemModule } from '../problem/problem.module';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';

@Module({
	imports: [ProblemModule],
	controllers: [QuizController],
	providers: [QuizService],
	exports: [],
})
export class QuizModule {}
