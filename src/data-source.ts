import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Task } from './tasks/entities/task.entity';
import * as dotenv from 'dotenv';
import { TaskSubscriber } from './tasks/subscribers/task.subscriber';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'mysql_db',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [User, Task],
  subscribers: [TaskSubscriber],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
};
console.log(dataSourceOptions);

const AppDataSource = new DataSource(dataSourceOptions);
export default AppDataSource;
