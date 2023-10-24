import { Injectable, computed, inject, signal } from "@angular/core";
import { Subject } from "rxjs";

import { RoomService } from "src/app/shared/data-access/room.service";
import { CreateRoom } from "src/app/shared/interfaces/create-room.interface";

export type CreateRoomStatus = 'pending' | 'creating room' | 'success' | 'error';

export interface CreateRoomState {
  status: CreateRoomStatus;
}

@Injectable({
  providedIn: 'root'
})
export class CreateRoomService {
  private roomService = inject(RoomService);

  error$ = new Subject<any>();
  createRoom$ = new Subject<CreateRoom>();

  // roomCreated$ = this.createRoom$.pipe(
  //   switchMap((roomInfo) => )
  // )

  private state = signal<CreateRoomState>({
    status: 'pending'
  });

  status = computed(() => this.state().status);

}
