import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoomWSService {

  constructor() { }

  ws: WebSocket | undefined;

  socketSend(roomId: number): Observable<any>{
    let userId = parseInt(<string>sessionStorage.getItem("userId"));
    this.ws = new WebSocket('ws://106.15.170.212:8011/api/ws/room/' + userId + "/" + roomId + "/0/0");
    if('WebSocket' in window){
      return new Observable(observer => {
        if(this.ws){
          this.ws.onopen = function (event){
            console.log("open:" + event);
          }
          this.ws.onmessage = function (event){
            observer.next(event.data);
          }
          this.ws.onerror = event => {
            console.log("websocket异常:" + event);
          };
          this.ws.onclose = event => {
            console.log("服务器关闭了链接" + event);
          };
        }
      })
    }else{
      console.log("浏览器不支持websocket");
      return new Observable<any>();
    }
  }

  sendMessage(message: string){
    let that = this;
    if(this.ws && this.ws.readyState === WebSocket.OPEN){
      this.ws.send(JSON.stringify(message));
    }else{
      setTimeout(function (){
        that.ws?.send(JSON.stringify(message));
      })
    }
  }
}
