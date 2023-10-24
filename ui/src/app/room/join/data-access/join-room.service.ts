import { Injectable, computed, inject, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { EMPTY, Subject, catchError, switchMap } from "rxjs";

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

  roomJoined$ = this.joinRoom$.pipe(
    switchMap((roomReq) =>
      this.roomService.joinRoom(roomReq).pipe(
        catchError((err) => {
          this.error$.next(err);
          return EMPTY;
        })
      )
    )
  );

  private state = signal<JoinRoomState>({
    status: 'pending'
  });

  joinRoomStatus = computed(() => this.state().status);

  constructor() {
    this.roomJoined$
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.state.mutate((state) => state.status = 'success');
      });

    this.joinRoom$
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.state.mutate((state) => state.status = 'joining');
      });


    this.error$
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.state.mutate((state) => state.status = 'error');
      });
  }
}
