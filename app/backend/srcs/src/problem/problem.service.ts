import { Injectable } from "@nestjs/common";
import { SelectionService } from "../selection/selection.service";

@Injectable()
export class ProblemService {
	constructor(
		private selectionService: SelectionService,
	) {}
}