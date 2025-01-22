import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonsComponent } from "./components/buttons/buttons.component";
import { ServerService } from './services/server.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, ButtonsComponent],
})
export class AppComponent {
  title = 'TicTacToe';

  serverService = inject(ServerService);
}
