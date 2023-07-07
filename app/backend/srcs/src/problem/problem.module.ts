import { Module } from "@nestjs/common";
import { ProblemService } from "./problem.service";
import { SelectionModule } from "../selection/selection.module";
import { ProblemController } from './problem.controller';

@Module({
	imports: [SelectionModule],
	providers: [ProblemService],
	exports: [ProblemService],
	controllers: [ProblemController],
})
export class ProblemModule {}