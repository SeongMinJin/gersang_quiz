import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { QuizController } from './quiz/quiz.controller';
import { QuizModule } from './quiz/quiz.module';
import { ProblemModule } from './problem/problem.module';
import { SelectionModule } from './selection/selection.module';
import { StasticsModule } from './stastics/stastics.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
      username: process.env.POSTGRES_USER,
      entities: [join(__dirname, "./**/entity/*.{js, ts}")],
      synchronize: true,
      autoLoadEntities: true,
    }),
    QuizModule,
    ProblemModule,
    SelectionModule,
    StasticsModule,
  ],
  controllers: [QuizController],
  providers: [],
})
export class AppModule {}
