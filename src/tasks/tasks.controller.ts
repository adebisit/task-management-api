import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Query,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DateGreaterThanNowValidationPipe } from 'src/common/pipes/validators.pipe';
import { Task } from './entities/task.entity';
import { User as GetUserFromReq } from 'src/common/decorators/user.decorator';
import { FindTasksDto } from './dto/find-task.dto';
import { User } from 'src/users/entities/user.entity';
import { UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { TaskOwnerGuard } from './tasks.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(
    @Body('dueAt', new DateGreaterThanNowValidationPipe()) dueAt: Date,
    @Body(new ValidationPipe()) createTaskDto: CreateTaskDto,
    @GetUserFromReq() user: User,
  ): Promise<Task> {
    return this.tasksService.create(createTaskDto, user.email);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@Query() query: FindTasksDto, @GetUserFromReq() user: User) {
    return this.tasksService.findAll(query, user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @UseGuards(TaskOwnerGuard)
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(TaskOwnerGuard)
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  @UseGuards(TaskOwnerGuard)
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
