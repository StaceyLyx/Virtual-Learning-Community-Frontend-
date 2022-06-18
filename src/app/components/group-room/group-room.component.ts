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
  groupId: number | undefined

  // 团队任务
  task: any = {};

  // 团队成员
  members: any = [];

  // 房间留言信息
  data: any = [];

  // 评论
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
      if(response.status === 200){
        this.task = response.data;
      }
    }).catch((error) =>{
      console.log("error: ", error);
    })

    // 获取roomId
    this.roomId = 0;
    axios.get("task/getRoomId",{
      params: {
        userId: sessionStorage.getItem("userId"),
        taskId: this.taskId,
      }
    }).then(response => {
      console.log("roomId: ", response);
      if(response.status === 200){
        this.roomId = response.data;

        // 获取团队房间的留言板信息
        if(this.roomId){
          this.roomService.socketSend(this.roomId).subscribe(
            raw => {
              let data = JSON.parse(raw);
              console.log("data: ");
              console.log(data);
              this.data = [
                ...this.data,
                {
                  username: data['susername'],
                  message: data['message'],
                }
              ]
            }
          );
        }

        // 获取团队成员信息
        axios.get("retrieveGroupUsers",{
          params: {
            roomId: this.roomId,
          }
        }).then(response => {
          console.log("group members: ", response);
          if(response.status === 200){
            this.members = response.data;
          }
        }).catch((error) =>{
          console.log("error: ", error);
        })
      }
    }).catch((error) =>{
      console.log("error: ", error);
    })

    // 获取groupId
    axios.get('task/getGroupId', {
      params: {
        taskId: this.taskId,
        userId: sessionStorage.getItem("userId"),
      }
    }).then((response) =>{
      console.log("response: ", response);
      if(response.status === 200){
        this.groupId = response.data;
      }
    }).catch((error) =>{
      console.log("error: ", error);
    })
  }

  handleSubmit(): void {
    this.submitting = true;
    // 发出信息
    this.roomService.sendMessage(this.inputValue);
    // 渲染自己的消息
    this.data = [
      ...this.data,
      {
        username: "Me",
        message: this.inputValue,
      }
    ]

    this.submitting = false;
    this.inputValue = '';
  }

  isVisible = false;
  groupName: string = "";
  groupLeader: string = "";
  assignGroupInfo(){
    axios.put('assignGroupInfo',
      {
        groupId: this.groupId,
        groupLeader: this.groupLeader,
        name: this.groupName,
      }
    ).then(response => {
      console.log("response: ", response)
      if(response.status === 200){
        this.message.success("小组信息设置成功！");
      }
    }).catch(error => {
      console.log("error: ", error.message)
      this.message.error("小组信息设置失败");
    })
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
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
