import {Component, OnInit, ViewChild} from '@angular/core';
import axios from "axios";
import {ElMessageService} from "element-angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @ViewChild("table", {static: true}) table : any

  constructor(private router: Router,
              private message: ElMessageService) { }

  expandSet = new Set<number>();
  tableData: any = []

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  ngOnInit(): void {
    this.getTaskList();
  }

  getTaskList() {
    axios.get('api/retrieveTasks/class', {
      params: {
        classId: 1
      }
    }).then((response) =>{
      if(response.status == 200){
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
        this.message.error("该课堂不存在");
        console.log(error);
      }else{
        console.log(error);
      }
    })
  }
}
