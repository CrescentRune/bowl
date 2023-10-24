import { Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";

import { JoinRoomFormComponent } from "./ui/join-room-form.component";
import { JoinRoomService } from "./data-access/join-room.service";

@Component({
  standalone: true,
  selector: 'app-join-room',
  imports: [RouterModule, JoinRoomFormComponent],
  template: `
    <app-join-room-form
      status="pending"
      (joinRoom)="joinRoomService.joinRoom$.next($event)">
    </app-join-room-form>
    <a class="menu-item" routerLink="/room/create">Create room instead</a>
  `,
  styleUrls: ['../shared/styles/menu-item.style.scss']
})
export class JoinRoomComponent {
  joinRoomService = inject(JoinRoomService);
}
