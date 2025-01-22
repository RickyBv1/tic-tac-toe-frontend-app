import { Component, computed, inject } from '@angular/core';
import { LobbyService } from '../../services/lobby.service';
import { PlayerNumber,BoardPosition } from '../../interfaces/lobby';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  lobbyService = inject(LobbyService);
  isMyTurn = computed (()=> 
    (this.lobbyService.status() === 'P1_TURN' && this.lobbyService.playerNumber() === 1) ||
    (this.lobbyService.status() === "P2_TURN" && this.lobbyService.playerNumber() ===  2));

  play (position:BoardPosition) {
    this.lobbyService.play(position);
  }

  getMark (player: '' | PlayerNumber){
    if(!player) return '';
    if(player === 1) return 'X';
    return 'O';
  }

}
