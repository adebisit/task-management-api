import { Module, forwardRef } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { TaskSubscriber } from './subscribers/task.subscriber';
import { TasksGateway } from './tasks.gateway';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    AuthModule,
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [TasksController],
  providers: [
    TasksService,
    TasksGateway,
    {
      provide: 'TASK_SUBSCRIBER',
      useFactory: (tasksGateway: TasksGateway, dataSource: DataSource) => {
        const subscriber = new TaskSubscriber(tasksGateway);
        dataSource.subscribers.push(subscriber);
        return subscriber;
      },
      inject: [TasksGateway, DataSource],
    },
  ],
})
export class TasksModule {}
