import { Component, computed, inject } from '@angular/core';
import { LobbyService } from '../../services/lobby.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-details',
  imports: [CommonModule],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.scss'
})
export class GameDetailsComponent {
  lobbyService = inject(LobbyService);

  lifeP1 = computed(() => new Array(this.lobbyService.player1().lifePoints))
  lifeP2 = computed(() => new Array(this.lobbyService.player2().lifePoints))
}
