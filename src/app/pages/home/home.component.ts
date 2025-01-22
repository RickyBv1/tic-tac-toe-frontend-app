import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ServerService } from '../../services/server.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  userService = inject(UserService);
  serverService = inject(ServerService);
  router = inject(Router)

  /**Ask the server if there is a public lobby available*/
  searchPublicLobby() {
    this.serverService.server.emitWithAck('findLobby').then(res => {
      //console.log(res);
      if (res === null) return this.router.navigate(['/play']);
      return this.router.navigate(['/play',res]);
    })
  }
}
