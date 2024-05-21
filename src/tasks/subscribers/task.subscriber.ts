import {
  EntitySubscriberInterface,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { Task } from '../entities/task.entity';
import { TasksGateway } from '../tasks.gateway';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { TaskDto } from '../dto/taslk.dto';

@Injectable()
export class TaskSubscriber implements EntitySubscriberInterface<Task> {
  constructor(private readonly taskGateway: TasksGateway) {}

  listenTo() {
    return Task;
  }

  afterInsert(event: InsertEvent<Task>) {
    const task = plainToClass(TaskDto, event.entity);
    this.taskGateway.emitTaskHandler('onTaskAdded', task);
  }

  afterUpdate(event: UpdateEvent<Task>) {
    const task = plainToClass(TaskDto, event.entity);
    this.taskGateway.emitTaskHandler('onTaskUpdated', task);
  }

  afterRemove(event: RemoveEvent<Task>) {
    const task = plainToClass(TaskDto, event.entity);
    this.taskGateway.emitTaskHandler('onTaskRemoved', task);
  }
}
