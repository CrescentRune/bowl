import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: 'room',
    loadChildren: () => import('./room/room.routes').then((m) => m.ROOM_ROUTES),
  },
  {
    path: 'game',
    loadComponent: () => import('./game/game.component').then((m) => m.GameComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'room',
  }
];
