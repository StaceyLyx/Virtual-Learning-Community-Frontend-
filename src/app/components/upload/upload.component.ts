import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import axios from "axios";
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  header: Boolean = true;

  taskId: number | undefined
  userId: number | undefined

  task: any = {
    id: 1,
    name: "高级Web",
    optional: 1,
    teamSize: 5,
    ddl: "2022-3-17",
    description: "A组",
    ev: 1,
    publisher: 1,
    validity: 2, // 0未审核 1审核通过 2已过期
  }

  score: boolean = this.task.teamSize == 1
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
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.taskId = params['taskId'];
    })
    // 获取用户id
    this.userId = 1

    // 获取任务
    //   axios.get('api?????', {
    //     params: {
    //       taskId: this.taskId
    //     }
    //   }).then((response) =>{
    //     console.log("response: ", response)
    //     if(response.status == 200){
    //       console.log("获取任务: ", this.taskId)
    //     }
    //   }).catch((error) =>{
    //     console.log("error: ", error)
    //   })
    // }
  }

  handleUpload(): void {
    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append('files[]', file);
    });
    // axios.post()
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

}
