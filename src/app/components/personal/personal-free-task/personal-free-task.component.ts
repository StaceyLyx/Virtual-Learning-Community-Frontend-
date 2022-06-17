import { Component, OnInit } from '@angular/core';
import axios from "axios";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-personal-free-task',
  templateUrl: './personal-free-task.component.html',
  styleUrls: ['./personal-free-task.component.css']
})
export class PersonalFreeTaskComponent implements OnInit {

  constructor(private message: NzMessageService) { }

  tableData: any = [];

  ngOnInit(): void {
    const formData = new FormData();
    formData.append('userId', <string>sessionStorage.getItem("userId"));

    axios.post('retrieveTasks/unfinishedFree', formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
    ).then(response => {
      console.log("response: ", response)
      if(response.status === 200){

      }
    }).catch(error => {
      console.log("error: ", error.response.data)
      this.message.error("任务获取失败");
    })
  }

}
