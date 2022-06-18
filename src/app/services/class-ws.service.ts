import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClassWSService {

  constructor() { }

  socketSend(classId: number, x: number, y: number): Observable<any>{
    let userId = parseInt(<string>sessionStorage.getItem("userId"));
    let ws = new WebSocket('ws://106.15.170.212:8011/api/ws/class/' + userId + "/" + classId + "/" + x + "/" + y);
    if('WebSocket' in window){
      return new Observable(observer => {
        ws.onopen = function (event){
          console.log("open:" + event);
        }
        ws.onmessage = function (event){
          observer.next(event.data);
        }
        ws.onerror = event => {
          console.log("websocket异常:" + event);
        };
        ws.onclose = event => {
          console.log("服务器关闭了链接" + event);
        };
      })
    }else{
      console.log("浏览器不支持websocket");
      return new Observable<any>();
    }
  }
}
