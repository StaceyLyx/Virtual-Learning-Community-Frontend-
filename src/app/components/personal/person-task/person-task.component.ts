import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";

@Component({
  selector: 'app-person-task',
  templateUrl: './person-task.component.html',
  styleUrls: ['./person-task.component.css']
})
export class PersonTaskComponent implements OnInit {

  constructor(private message: NzMessageService,
              private router: Router) { }

  initial: any = []
  tableData: any = [{
    id: 1,
    name: '高级web',
    optional: 1,
    teamSize: 4,
    ddl: '2021-2-1',
  },{
    id: 2,
    name: '图形学',
    optional: 1,
    teamSize: 1,
    ddl: '2021-2-1',
  }]

  selectedValue: string = 'personal';
  groupHidden: boolean = this.selectedValue == 'personal';
  expandSet = new Set<number>();

  ngOnInit(): void {
    axios.get('retrieveTasks/user', {
      params: {
        userId: parseInt(<string>sessionStorage.getItem("userId")),
      }
    }).then((res) =>{
      console.log(res)
      if(res.status == 200){
        this.initial = res.data;
        this.tableData = res.data.personal;
      }else{
        console.log(res);
      }
    }).catch((error) =>{
      if(error.status == 400){
        this.message.error("获取个人任务失败");
        console.log(error);
      }else{
        console.log(error);
      }
    })
  }

  changeTask(){
    if(this.selectedValue === 'group'){
      this.tableData = this.initial.group;
      this.groupHidden = false;
    }else{
      this.tableData = this.initial.personal;
      this.groupHidden = true;
    }
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  uploadTask(id: number, teamSize: number){
    // 小组任务
    if(teamSize === 1){
      this.router.navigate(['tasks/upload'], {
        queryParams: {
          taskId: id,
        }
      }).then(r => {
        console.log(r);
      })
    }else{
      // 团队任务，进入团队空间
      this.router.navigate(['tasks/group'], {
        queryParams: {
          taskId: id,
        }
      }).then(r => {
        console.log(r);
      })
    }
  }

}
