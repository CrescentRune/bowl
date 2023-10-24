import { Component, EventEmitter, Input, Output, inject } from "@angular/core";

import { JoinRoom } from "src/app/shared/interfaces/join-room.interface";
import { FormBuilder, Validators } from "@angular/forms";
import { JoinRoomStatus } from "../data-access/join-room.service";

@Component({
  standalone: true,
  selector: 'app-join-room-form',
  template: ``
})
export class JoinRoomFormComponent {
  @Input({required: true}) status!: JoinRoomStatus;
  @Output() joinRoom = new EventEmitter<JoinRoom>();

  fb = inject(FormBuilder);

  joinRoomForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    roomCode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
  });


}
