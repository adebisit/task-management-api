import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Priority } from '../entities/task.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  description?: string;

  @IsDateString()
  dueAt?: Date = new Date(
    Math.round((Date.now() + 1800000) / 3600000) * 3600000 + 3600000,
  );

  @IsEnum(Priority)
  priority?: Priority = 1;

  @IsOptional()
  readonly user?: User;
}
