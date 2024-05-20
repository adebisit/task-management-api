import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { Task } from '../entities/task.entity';
// import { EventsGateway } from 'src/events.gateway';
// import { Inject } from '@nestjs/common';

@EventSubscriber()
export class TaskSubscriber implements EntitySubscriberInterface<Task> {
  // constructor(
  //   @Inject(EventsGateway) private readonly eventsGateway: EventsGateway,
  // ) {}

  listenTo() {
    return Task;
  }

  afterInsert(event: InsertEvent<Task>) {
    console.log('Task Inserted');
    console.log(event.entity);
    // this.eventsGateway.broadcastEvent('taskCreated', event.entity);
  }

  afterUpdate(event: UpdateEvent<Task>) {
    console.log('Task Updated');
    console.log(event);
  }

  beforeRemove(event: RemoveEvent<Task>) {
    console.log('Before Remove');
    console.log(event);
  }

  afterRemove(event: RemoveEvent<Task>) {
    console.log('After Remove');
    console.log(event);
  }
}
