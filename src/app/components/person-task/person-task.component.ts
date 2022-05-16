import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import {ElMessageService} from "element-angular";

@Component({
  selector: 'app-person-task',
  templateUrl: './person-task.component.html',
  styleUrls: ['./person-task.component.css']
})
export class PersonTaskComponent implements OnInit {

  constructor(private message: ElMessageService) { }

tableData: any = []



  ngOnInit(): void {
    this.getTaskList();
  }
  getTaskList() {
    axios.get('api/retrieveTasks/user', {
      params: {
        userId: 0
      }
    }).then((response) =>{
      if(response.status == 200){
        console.log(response)
        this.tableData = response.data.tableData
        for(let i = 0; i < response.data.result.length; ++i){
          this.tableData.push(response.data.result[i]);
        }
        console.log(this.tableData)
      }else{
        console.log(response);
      }
    }).catch((error) =>{
      if(error.status == 400){
        this.message.setOptions({showClose: true});
        this.message.error("无任务");
        console.log(error);
      }else{
        console.log(error);
      }
    })
  }

}
