import { Module, forwardRef } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { TaskSubscriber } from './subscribers/task.subscriber';

@Module({
  imports: [
    AuthModule,
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [TasksController],
  providers: [TasksService, TaskSubscriber],
})
export class TasksModule {}
