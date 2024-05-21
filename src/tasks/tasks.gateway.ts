// import { UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  // SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
// import { AuthWSGuard } from 'src/auth/auth.ws.guard';
import { TaskDto } from './dto/taslk.dto';

@WebSocketGateway()
export class TasksGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('Websocket initialized');
  }

  handleConnection() {
    console.log(`Client connected:`);
  }

  handleDisconnect() {
    console.log(`Client disconnected`);
  }

  // @UseGuards(AuthWSGuard)
  // @SubscribeMessage('tasksEvents')
  emitTaskHandler(event: string, task: TaskDto) {
    this.server.emit(event, task);
  }
}
