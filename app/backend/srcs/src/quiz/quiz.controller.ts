import { Body, Controller, FileTypeValidator, Get, Param, ParseFilePipe, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller("quiz")
export class QuizController {

	constructor(
		private quizService: QuizService
	){}

	@Get()
	async get() {
		return await this.quizService.findAll();
	}

	@Post("create")
	@UseInterceptors(FileInterceptor("thumbnail"))
	async create(@Body() {title}: {title: string}, @UploadedFile(
		new ParseFilePipe({
			validators: [
				new FileTypeValidator({ fileType: "image/*"}),
			]
		})
	) file: Express.Multer.File) {
		console.log(file);
		console.log(title);
	}

}
