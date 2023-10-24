import { Route } from '@angular/router';

export const ROOM_ROUTES: Route[] = [
  {
    path: 'create',
    loadComponent: () => import('./create/create-room.component').then((m) => m.CreateRoomComponent),
  },
  {
    path: 'join',
    loadComponent: () => import('./join/join-room.component').then((m) => m.JoinRoomComponent),
  },
  {
    path: '',
    redirectTo: 'join',
    pathMatch: 'full'
  }
]
