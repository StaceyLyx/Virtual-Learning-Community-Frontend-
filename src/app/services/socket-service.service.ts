import { Injectable } from '@angular/core';
import io from "socket.io-client";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {

  private baseURL = 'ws://localhost:8081/api/websocket/';
  private socket: any;

  constructor() { }

  socketSend(id: number){
    this.socket = io(this.baseURL + id);     // 关联用户ID
    this.socket.emit('position', {position: [150, 0, 50]});
  }

  socketGet(id: number): Observable<any>{
    return new Observable(observer => {
      this.socket = io(this.baseURL + id, {withCredentials: true});
      this.socket.on('message', (data: any) => {
        observer.next(data);
      });
      return ()=>{
        this.socket.disconnect();
      }
    })
  }
}
