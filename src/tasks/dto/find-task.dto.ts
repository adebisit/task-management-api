import {
  IsOptional,
  IsString,
  IsBoolean,
  IsDate,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Priority } from '../entities/task.entity';
import { IsDateRangeValid } from 'src/common/decorators/is-date-range-valid.decorator';

export class FindTasksDto {
  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @IsDateRangeValid('createdBefore', {
    message: 'createdAfter must be earlier than createdBefore',
  })
  createdAfter?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createdBefore?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @IsDateRangeValid('dueBefore', {
    message: 'dueAfter must be earlier than dueBefore',
  })
  dueAfter?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dueBefore?: Date;

  @IsOptional()
  @IsEnum(Priority, { each: true })
  @Type(() => Number)
  priority?: Priority[];

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  completed?: boolean;
}
