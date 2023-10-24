import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { JoinRoom } from "../interfaces/join-room.interface";
import { CreateRoom } from "../interfaces/create-room.interface";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private readonly apiUrl = 'localhost:8080';

  http = inject(HttpClient);

  joinRoom(req: JoinRoom) {
    return this.http.post(this.apiUrl, req);
  }

  createRoom(req: CreateRoom) {
    return this.http.post(this.apiUrl, req);
  }

}
