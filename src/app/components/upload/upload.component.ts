import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import axios from "axios";
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import {NzNotificationService} from "ng-zorro-antd/notification";

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

  task: any = [];

  score: boolean | undefined;
  isVisible = false;

  panels = [{
    active: true,
    name: '点击开始完成任务',
    icon: 'double-right',
  }]

  inputValue?: string;
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
    this.userId = 3

    // 获取任务
    axios.get('retrieveTask/' + this.taskId
    ).then((response) =>{
      console.log("response: ", response)
      if(response.status == 200){
        this.task = response.data;
        this.score = this.task.teamSize === 1;    // 一定要在这里面设置，否则会出现回调的问题
      }
    }).catch((error) =>{
      console.log("error: ", error)
    })
  }

  handleUpload(): void {
    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append('files[]', file);
    });

    console.log(this.fileList);
    console.log(formData);

    axios.put('submitPersonalTask', {
      taskId: this.taskId,
      userId: 3,
      file: this.fileList[0],
    }).then(response => {
      console.log("response: ", response)
      if(response.status === 200){
        this.message.success("任务提交成功！");
      }
    }).catch(error => {
      console.log("error: ", error.message)
      this.message.error("任务提交失败");
    })
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
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

}
