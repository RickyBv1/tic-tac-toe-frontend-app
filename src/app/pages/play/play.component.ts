import { Component, computed, effect, inject, input, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServerService } from '../../services/server.service';
import { UserService } from '../../services/user.service';
import { BoardComponent } from '../../components/board/board.component';
import { GameDetailsComponent } from '../../components/game-details/game-details.component';
import { LobbyService } from '../../services/lobby.service';
import { FullscreenModeComponent } from "../../components/fullscreen-mode/fullscreen-mode.component";
import { GameStatus } from '../../interfaces/lobby';
import { Location } from '@angular/common';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [RouterModule, BoardComponent, GameDetailsComponent, FullscreenModeComponent],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss',
})
export class PlayComponent implements OnInit {

  serverService = inject(ServerService);
  userService = inject(UserService);
  lobbyService = inject(LobbyService)
  location = inject(Location);
  isPrivate = input();
  id = input<string>();
  showStatus:GameStatus[] = ['ABANDONED', 'DRAW', 'WAITING_PARTNER', 'P1_GRAND_VICTORY', 'P2_GRAND_VICTORY', 'P1_VICTORY', 'P2_VICTORY'] 
  showMode = computed(()=> this.showStatus.includes(this.lobbyService.status()));
  pastStatus = signal<GameStatus>('WAITING_PARTNER');
  changePastStatus = effect(() => {
    if(this.lobbyService.status()){
      setTimeout(() => {
        this.pastStatus.set(this.lobbyService.status());
        this.statusChangedALongTimeAgo = false;
      },300),
      {allowSignalWrites: true}
    }
  });
  copiedLink = signal<boolean>(false);
  statusChangedALongTimeAgo = true;

  ngOnInit(): void {
    this.location.replaceState('play');
    if (!this.isPrivate() && !this.id()) {
      this.lobbyService.createLobby();
    } else if(this.id()) {
      this.lobbyService.joinLobby(parseInt(this.id()!));
    } else {
      this.lobbyService.createLobby(true);
    }
  }

  nextGame(){
    this.lobbyService.nextGame();
  }

  copyLink(){
    navigator.clipboard.writeText('localhost:4200/play/'+this.lobbyService.id());
    this.copiedLink.set(true);
    setTimeout(() => this.copiedLink.set(false), 2000);
  }

}
