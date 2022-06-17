import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import axios from "axios";
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import {KeyValue} from "@angular/common";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private message: NzMessageService) { }

  taskId: number | undefined
  userId: number | undefined
  roomId: number | undefined
  groupId: number | undefined
  members: any = [];

  task: any = [];

  // 分配经验值
  groupScore: any = [];

  score: boolean | undefined;
  isVisible = false;

  panels = [{
    active: true,
    name: '点击开始完成任务',
    icon: 'double-right',
  }]

  fileList: NzUploadFile[] = [];

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  ngOnInit(): void {
    // 获取任务id
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.taskId = queryParams['taskId'];
    })
    // 获取用户id
    this.userId = parseInt(<string>sessionStorage.getItem("userId"));

    // 获取任务
    axios.get('retrieveTask/' + this.taskId).then((response) =>{
      console.log("response: ", response)
      if(response.status == 200){
        this.task = response.data;
        this.score = this.task.teamSize === 1;    // 一定要在这里面设置，否则会出现回调的问题
      }
    }).catch((error) =>{
      console.log("error: ", error)
    })

    // 获取roomId
    axios.get("task/getRoomId",{
      params: {
        userId: sessionStorage.getItem("userId"),
        taskId: this.taskId,
      }
    }).then(response => {
      console.log("roomId: ", response);
      if(response.status == 200){
        this.roomId = response.data;

        // 获取团队成员信息
        axios.get("retrieveGroupUsers",{
          params: {
            roomId: this.roomId,
          }
        }).then(response => {
          console.log("group members: ", response);
          if(response.status == 200){
            this.members = response.data;

            let that = this;
            for(let i = 0; i < this.members.length; ++i){
              let temp = new class implements KeyValue<number, number> {
                key: any = that.members[i].username;
                value: number = 0;
              }
              this.groupScore.push(temp);
            }
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
      if(response.status == 200){
        this.groupId = response.data;
      }
    }).catch((error) =>{
      console.log("error: ", error);
    })
  }

  handleUpload(): void {
    const formData = new FormData();
    formData.append('userId', <string>sessionStorage.getItem("userId"));
    formData.append('taskId', <string><unknown>this.taskId);
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });

    axios.put('submitPersonalTask', formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
    ).then(response => {
      console.log("response: ", response)
      if(response.status === 200){
        this.message.success("任务提交成功！");
      }
    }).catch(error => {
      console.log("error: ", error.message)
      this.message.error("任务提交失败");
    })
  }

  // 分配经验值
  groupExp(){
    let sum = 0;
    for(let i = 0; i < this.groupScore.length; ++i){
      sum += this.groupScore[i].value;
    }

    // 查看任务总值
    if(sum > 1){
      this.message.error("分配失败，小组成员分配比例总和不可大于1");
    }else if(sum < 1){
      this.message.warning("小组成员分配比例总和小于1");
    }

    // 提交经验值分配
    if(sum === 1){
      var temp = {};
      // for(let i = 0; i < this.groupScore.length; ++i) {
      //   var demo = 'a';
      //   temp[demo] = this.groupScore[i].value;
      // }
      console.log(temp);
      axios.put('submitGroupTask/exp',
        {
          groupId: this.groupId,
          score: temp,
          userId: sessionStorage.getItem("userId"),
        }
      ).then(response => {
        console.log("response: ", response)
        if(response.status === 200){
          this.message.success("小组成员贡献分配成功！");
        }
      }).catch(error => {
        console.log("error: ", error.response)
        this.message.error("分配失败，请重试！");
      })
    }
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
    if(path === "group"){
      this.router.navigate(['tasks/group'], {
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
