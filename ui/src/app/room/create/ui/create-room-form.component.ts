import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

import { CreateRoom } from "src/app/shared/interfaces/create-room.interface";
import { CreateRoomStatus } from "../data-access/create-room.service";

@Component({
  standalone: true,
  selector: 'app-create-room-form',
  template: `

  `
})
export class CreateRoomFormComponent {
  @Input({required: true}) status!: CreateRoomStatus;
  @Output() createRoom = new EventEmitter<CreateRoom>();

  private fb = inject(FormBuilder);

  createRoomForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
  });

  onSubmit() {
    if (this.createRoomForm.valid) {
      const createRoom = this.createRoomForm.getRawValue();
      this.createRoom.emit(createRoom);
    }
  }

}
