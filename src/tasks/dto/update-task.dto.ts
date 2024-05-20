import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import {
  IsOptional,
  IsEnum,
  IsString,
  IsBoolean,
  IsDate,
  MinDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Priority } from '../entities/task.entity';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @MinDate(new Date(), { message: 'dueAt must be a future date' })
  dueAt?: Date;

  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  completed?: boolean;
}
