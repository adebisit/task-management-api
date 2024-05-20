import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { FindTasksDto } from './dto/find-task.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createTaskDto: CreateTaskDto, userEmail): Promise<Task> {
    const user = await this.userRepository.findOne({
      where: { email: userEmail },
    });
    if (!user) {
      throw new Error('User not Found');
    }
    const task = this.tasksRepository.create({ ...createTaskDto, user });
    return this.tasksRepository.save(task);
  }

  async findAll(query: FindTasksDto, user: User): Promise<Task[]> {
    const {
      keyword,
      createdAfter,
      createdBefore,
      dueAfter,
      dueBefore,
      priority,
      completed,
    } = query;

    const queryBuilder = this.tasksRepository.createQueryBuilder('task');
    queryBuilder.leftJoinAndSelect('task.user', 'user');
    queryBuilder.where('user.email = :user', { user: user.email });

    if (keyword) {
      queryBuilder.andWhere(
        'task.title LIKE :keyword OR task.description LIKE :keyword',
        { keyword: `%${keyword}%` },
      );
    }
    if (createdAfter) {
      queryBuilder.andWhere('task.createdAt >= :createdAfter', {
        createdAfter,
      });
    }
    if (createdBefore) {
      queryBuilder.andWhere('task.createdAt <= :createdBefore', {
        createdBefore,
      });
    }
    if (dueAfter) {
      queryBuilder.andWhere('task.dueAt >= :dueAfter', { dueAfter });
    }
    if (dueBefore) {
      queryBuilder.andWhere('task.dueAt <= :dueBefore', { dueBefore });
    }
    if (priority && priority.length > 0) {
      queryBuilder.andWhere('task.priority IN (:...priority)', { priority });
    }
    if (completed !== undefined) {
      queryBuilder.andWhere('task.completed = :completed', { completed });
    }

    return queryBuilder.getMany();
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    Object.assign(task, updateTaskDto);
    return this.tasksRepository.save(task);
  }

  async remove(id: number) {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    await this.tasksRepository.remove(task);
  }
}
