import { inject, Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { UserService } from './user.service';
import { CreateLobbyArgs } from '../interfaces/createLobby';
import { JoinLobbyArgs } from '../interfaces/joinLobby';
import { LobbyBackend } from '../interfaces/lobby';
import { LobbyService } from './lobby.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  server = io('localhost:3000',{autoConnect: false});
  userService = inject(UserService);

  lobbyUpdate$ = new Subject<LobbyBackend>();

  constructor() {
    this.server.on('connect',()=>{
      //console.log('Connected to backend');
    });
    this.server.on('lobby',(args) => {
      this.lobbyUpdate$.next(args)
    })
    this.server.connect();
  }
}
