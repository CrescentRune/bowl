import { Injectable, computed, inject, signal } from "@angular/core";
import { Subject } from "rxjs";

import { RoomService } from "src/app/shared/data-access/room.service";
import { JoinRoom } from "src/app/shared/interfaces/join-room.interface";

export type JoinRoomStatus = 'pending' | 'joining' | 'success' | 'error';

interface JoinRoomState {
  status: JoinRoomStatus;
}

@Injectable({
  providedIn: 'root'
})
export class JoinRoomService {
  private roomService = inject(RoomService);

  error$ = new Subject<any>();
  joinRoom$ = new Subject<JoinRoom>();

  private state = signal<JoinRoomState>({
    status: 'pending'
  });

  joinRoomStatus = computed(() => this.state().status);
}
