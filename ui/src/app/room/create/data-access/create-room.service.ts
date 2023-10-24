import { Injectable, computed, inject, signal } from "@angular/core";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, Subject, catchError, switchMap, take } from "rxjs";

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

  roomCreated$ = this.createRoom$.pipe(
     switchMap((roomInfo) =>
      this.roomService.createRoom(roomInfo).pipe(
        catchError((err) => {
          this.error$.next(err);
          return EMPTY;
        })
      )
    )
  );

  private state = signal<CreateRoomState>({
    status: 'pending'
  });

  status = computed(() => this.state().status);

  constructor() {
    this.roomCreated$
      .pipe(takeUntilDestroyed())
      .subscribe(() =>
        this.state.mutate((state) => state.status = 'success')
      );

    this.createRoom$
      .pipe(takeUntilDestroyed())
      .subscribe(() =>
        this.state.mutate((state) => state.status = 'creating room')
      );

    this.error$
      .pipe(takeUntilDestroyed())
      .subscribe(() =>
        this.state.mutate((state) => state.status = 'error')
      );
  }

}

