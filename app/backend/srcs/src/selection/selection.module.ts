import { Module } from "@nestjs/common";
import { SelectionService } from "./selection.service";

@Module({
	providers: [SelectionService],
	exports: [SelectionService],
})
export class SelectionModule {}