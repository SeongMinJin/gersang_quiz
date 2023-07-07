import { Injectable } from '@nestjs/common';
import { ProblemService } from '../problem/problem.service';

@Injectable()
export class QuizService {
	constructor(
		private problemService: ProblemService,
	){}
}
