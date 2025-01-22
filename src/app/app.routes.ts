import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlayComponent } from './pages/play/play.component';
import { ChangeUsernameComponent } from './pages/change-username/change-username.component';
import { needNameGuard } from './guards/need-name.guard';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        canActivate: [needNameGuard]
    },
    {
        path: "play",
        component: PlayComponent,
        canActivate: [needNameGuard]
    },
    {
        path: "play/:id",
        component: PlayComponent,
        canActivate: [needNameGuard]
    },
    {
        path: "play-private",
        component: PlayComponent,
        canActivate: [needNameGuard],
        data: {isPrivate: true}
    },
    {
        path: "change-username",
        component: ChangeUsernameComponent
    }
];
