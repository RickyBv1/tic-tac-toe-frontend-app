import { inject, Injectable, signal } from '@angular/core';
import { Board, BoardPosition, GameStatus, LobbyBackend, WinningLine } from '../interfaces/lobby';
import { Player } from '../interfaces/players';
import { ServerService } from './server.service';
import { CreateLobbyArgs } from '../interfaces/createLobby';
import { JoinLobbyArgs } from '../interfaces/joinLobby';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  serverService = inject(ServerService);
  userService = inject(UserService);
  router = inject(Router);

  constructor() {
    this.serverService.lobbyUpdate$.subscribe((lobby) => {
      this.destructureLobby(lobby);
    });
  }
  player1 = signal<Player> ({
    name: '',
    lifePoints: 0
  });
  player2 = signal<Player> ({
    name: '',
    lifePoints: 0
  });
  status = signal<GameStatus>('WAITING_PARTNER');
  playerNumber = signal<1|2|undefined>(undefined);
  id = signal<number|undefined>(undefined);
  board = signal<Board>(['','','','','','','','','',]);
  public = signal<boolean|undefined>(undefined);
  winningLine = signal<WinningLine | undefined>(undefined);

  destructureLobby(lobbyBack:LobbyBackend){
    //console.log('destructuring', lobbyBack)
    if(!lobbyBack) this.router.navigate(['/']);
    this.id.set(lobbyBack.id);
    this.status.set(lobbyBack.status);
    this.player1.set(lobbyBack.players[0]);
    this.player2.set(lobbyBack.players[1]);
    this.board.set(lobbyBack.board);
    this.public.set(lobbyBack.public);
    this.winningLine.set(lobbyBack.winningLine);
  }

  /**Create a lobby, either public or private*/
  createLobby(isPrivate:boolean = false) {
    const args:CreateLobbyArgs = {
      public: !isPrivate,
      namePlayer: this.userService.name()
    }
    this.serverService.server.emitWithAck('createLobby', args).then(res => {
      //console.log('Create lobby', res)
      this.destructureLobby(res.lobby);
      this.playerNumber.set(1)
    })
  }

  /**Add the player to a lobby*/
  joinLobby(id:number) {
    const args:JoinLobbyArgs = {
      id,
      namePlayer: this.userService.name()
    }
    this.serverService.server.emitWithAck('joinLobby', args).then(res => {
      //console.log('result of joining the lobby', res)
      this.destructureLobby(res.lobby)
      this.playerNumber.set(2)
    })
  }
  /**Sends a player's request to make a move to the server*/
  play(position:BoardPosition){
    //console.log('Emitting play')
    this.serverService.server.emit('play', {
      lobbyId: this.id(),
      player: this.playerNumber(),
      position
    })
  }

  /**send to the server the request to start a new game*/
  nextGame(){
    this.serverService.server.emit('nextGame', {lobbyId: this.id()});
  }
}
