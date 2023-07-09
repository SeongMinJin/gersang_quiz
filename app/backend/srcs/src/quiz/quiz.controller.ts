import { Body, Controller, FileTypeValidator, Get, HttpCode, Param, ParseFilePipe, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFile } from 'fs';
@Controller("quiz")
export class QuizController {

	constructor(
		private quizService: QuizService
	){}

	@Get()
	async get() {
		return await this.quizService.findAll();
	}

	@Get("thumbnail/:id")
	async getThumbnail(@Param("id") id: number) {
		return await this.quizService.findOneById(id);
	}

	@Post("create")
	@HttpCode(201)
	@UseInterceptors(FileInterceptor("thumbnail"))
	async create(@Body() {title, description}: {title: string, description: string}, @UploadedFile(
		new ParseFilePipe({
			validators: [
				new FileTypeValidator({ fileType: "image/*", }),
			]
		})
	) thumbnail: Express.Multer.File) {
		writeFile("./thumbnail.png", thumbnail.buffer, "binary", (err) => {
			if (err) {
				console.log(err);
			}
		})
		return await this.quizService.create(thumbnail.buffer, title, description);
	}

}
