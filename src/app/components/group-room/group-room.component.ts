import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import axios from "axios";
import {RoomWSService} from "../../services/room-ws.service";

@Component({
  selector: 'app-group-room',
  templateUrl: './group-room.component.html',
  styleUrls: ['./group-room.component.css']
})
export class GroupRoomComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private message: NzMessageService,
              private roomService: RoomWSService) { }

  taskId: number | undefined
  userId: number | undefined
  roomId: number | undefined

  // 团队任务
  task: any;

  // 房间留言信息
  data = [
    {
      author: 'Sun Yue',
      message: '评论'
    },
    {
      author: 'Liu Peiqi',
      message: '进行一个评论'
    }
  ];

  submitting = false;
  inputValue = '';

  ngOnInit(): void {

    // 获取任务id
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.taskId = queryParams['taskId'];
    })

    // 获取用户id
    this.userId = 3

    // 获取任务信息
    axios.get('retrieveTask/' + this.taskId).then((response) =>{
      console.log("response: ", response);
      if(response.status == 200){
        this.task = response.data;
      }
    }).catch((error) =>{
      console.log("error: ", error);
    })

    this.roomId = 0;
    axios.get("getRoom/task",{
      params: {
        userId: sessionStorage.getItem("userId"),
        taskId: this.taskId,
      }
    }).then(response => {
      console.log("response: ", response);
      if(response.status == 200){
        this.roomId = response.data;
      }
    }).catch((error) =>{
      console.log("error: ", error);
    })

    // 获取团队房间的留言板信息
    this.roomService.socketSend(this.roomId).subscribe(
      raw => {
        let data = JSON.parse(raw);
        console.log("message data: " + data);
      }
    );
  }

  handleSubmit(): void {
    this.submitting = true;
    this.data = [
      ...this.data,
      {
        author: 'Liao Yanxin',
        message: this.inputValue,
      }
    ]
    this.submitting = false;
    this.inputValue = '';
  }

  routerTo(path: string){
    if(path === "tasks/upload"){
      this.router.navigate(['tasks/upload'], {
        queryParams: {
          taskId: this.taskId,
        }
      }).then(r => {
        console.log(r);
      })
    }else{
      this.router.navigateByUrl(path).then(r => {
        if (r) {
          console.log("navigate successfully")
        } else {
          console.log("local index")
        }
      })
    }
  }

}