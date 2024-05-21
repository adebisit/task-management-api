import { Task } from '../entities/task.entity';
import { OmitType } from '@nestjs/mapped-types';

export class TaskDto extends OmitType(Task, ['user'] as const) {}
