import { Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";

import { CreateRoomService } from "./data-access/create-room.service";
import { CreateRoomFormComponent } from "./ui/create-room-form.component";

@Component({
  standalone: true,
  selector: 'app-create-room',
  imports: [RouterModule, CreateRoomFormComponent],
  template: `
    <app-create-room-form
      [status]="createRoomService.status()"
      (createRoom)="createRoomService.createRoom$.next($event)">
    </app-create-room-form>
    <a class="menu-item" routerLink="/room/join">Join room instead</a>
  `,
  styleUrls: ['../shared/styles/menu-item.style.scss']
})
export class CreateRoomComponent {
  createRoomService = inject(CreateRoomService);
}
