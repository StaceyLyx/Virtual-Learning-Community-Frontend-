import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-group-room',
  templateUrl: './group-room.component.html',
  styleUrls: ['./group-room.component.css']
})
export class GroupRoomComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private message: NzMessageService) { }

  taskId: number | undefined
  userId: number | undefined

  task: any;

  data = [
    /* {
      author: 'Sun Yue',
      content: '评论'
    },
    {
      author: 'Liu Peiqi',
      content: '进行一个评论'
    } */
    {
    author: '',
    content: ''
    }
  ];
  e: any;
  websock: any;
  roomId: any;
  //在房间里的人员
  member: any;
  members: any = [];
  submitting = false;
  inputValue = '';

  ngOnInit(): void {


    // 获取任务id
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.taskId = queryParams['taskId'];
    })
    // 获取用户id
    this.userId = 3

    this.task = {
      name: '高级web',
      ev: 1,
      teamSize: 4,
      publisherName: 'tuna',
      description: '123123',
    }
    this.websochetInit()
    //房间号 查找在线人员
     this.websock.send("{Room:'" + this.roomId + "'")
    this.websock.onmessage = (event: MessageEvent) => {
      console.log(event.data);
      var data = JSON.parse(event.data);
      let temp: string = data.Message;
      temp.split(",").forEach(
        (val, idx, array) => {
          // val: 当前值
          // idx：当前index
          // array: Array
          //加入新成员
          console.log(idx.toString() + ":" + val);
          if (this.members.indexOf(val) < 0) {
            this.members.push(val);
          }
        }
      );
      // 获取人物信息
      //this.user = localStorage.getItem('')
    } 
  }

  handleSubmit(): void {
    this.submitting = true;
    this.data = [
      ...this.data,
      {
        //
        author: 'Liao Yanxin',
        content: this.inputValue,
      }
    ]
    this.submitting = false;
    this.inputValue = '';
    //连接
    this.ready(this.inputValue);
  }

  routerTo(path: string){
    this.router.navigateByUrl(path).then(r => {
      if (r) {
        console.log("navigate successfully")
      } else {
        console.log("local index")
      }
    })
  }
  ready(data: any) {
    if (this.websock.readyState === 1) {
      // this.websock.readyState = 1 表示连接成功，可以立即发送信息
      this.websocketSend(data);
    } else if (this.websock.readyState === 0) {
      // 表示正在连接，设置300ms后发送信息
      setTimeout(() => {
        this.websocketSend(data);
      }, 300);
    } else {
      // 连接未创建或者创建失败，则重新创建连接，并设置500ms后发送信息
      this.websochetInit();
      setTimeout(() => {
        this.websocketSend(data);
      }, 500);
    }
  }
 websochetInit() {
  this.websock = new WebSocket('ws://localhost:8081/api/ws/room'+this.userId+this.roomId);
  this.websock.onmessage = this.websocketMessage;
}

websocketSend(data: any) {
  
  const inputdata = JSON.stringify({
    //author 获取当前用户名字
    author: 'Liao Yanxin',
    content: this.inputValue,
  })
  this.websock.send(JSON.stringify(data));
}
/* websocket接收服务器返回的信息 */
websocketMessage(e: any) {
  console.log(e)
  const msg = JSON.parse(e.data)
  console.log(msg)
  this.data.push(msg)
}

}