import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-change-username',
  imports: [FormsModule, RouterModule],
  templateUrl: './change-username.component.html',
  styleUrl: './change-username.component.scss'
})
export class ChangeUsernameComponent {

  userService = inject(UserService);
  router = inject(Router);

  changeNameAndComeBack(newName:string){
    this.userService.name.set(newName);
    this.router.navigate(['/']);
  }

}
