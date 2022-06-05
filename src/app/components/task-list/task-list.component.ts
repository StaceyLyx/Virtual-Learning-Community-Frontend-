import {Component, OnInit, ViewChild} from '@angular/core';
import axios from "axios";
import {Router} from "@angular/router";
import {NzTableSortFn, NzTableSortOrder} from "ng-zorro-antd/table";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzNotificationService} from "ng-zorro-antd/notification";

interface task {
  name: string,
  type: number,
  teamSize: number,
  ddl: string,
}

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<task> | null;
  sortDirections: NzTableSortOrder[];
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @ViewChild("table", {static: true}) table : any

  constructor(private router: Router,
              private notification: NzNotificationService,
              private message: NzMessageService) { }

  tableData: any = []

  ngOnInit(): void {
    axios.get('retrieveTasks/class', {
      params: {
        classId: 1
      }
    }).then((response) =>{
      console.log("response", response)
      if(response.status == 200){
        this.tableData = response.data.result;
      }
    }).catch((error) =>{
      console.log("error: ", error)
    })
  }

  expandSet = new Set<number>();
  listOfColumns: ColumnItem[] = [
    {
      name: '任务名称',
      sortOrder: null,
      sortFn: null,
      sortDirections: [null],
    },{
      name: '任务类型',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a:task, b: task) => a.type - b.type,
    },{
      name: '任务人数',
      sortOrder: null,
      sortFn: (a: task, b: task) => a.teamSize - b.teamSize,
      sortDirections: ['ascend', 'descend', null],
    },{
      name: '截止日期',
      sortOrder: null,
      sortFn: (a: task, b: task) => a.ddl.length - b.ddl.length,
      sortDirections: ['ascend', 'descend', null],
    },{
      name: '接受任务',
      sortOrder: null,
      sortFn: null,
      sortDirections: [null],
    },{
      name: '审核状态',
      sortOrder: null,
      sortFn: null,
      sortDirections: [null],
    },
  ];

  header: Boolean = true;

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  disabled(value: number): boolean{
    return value !== 1;
  }

  acceptTasks(taskId: number, teamSize: number){
    if(teamSize == 1){
      axios.post('personalTaskOn', {
        taskId: taskId,
        userId: 3
      }).then(response => {
        console.log("response: ", response)
        if(response.status === 200){
          this.notification.create(
            'success',
            '接受个人任务',
            '去“我的任务”里查看任务吧！'
          )
        }
      }).catch(error => {
        console.log("error: ", error)
        this.notification.create(
          'error',
          'Oops！',
          error.message
        )
      })
    }else{
      // TODO: 团队任务websocket
      this.notification.create(
        'success',
        '接受团队任务',
        '去“我的任务”查看任务进展情况吧！'
      )
    }
  }

  routerTo(path: string){
    this.router.navigateByUrl(path).then(r => {
      if (r) {
        console.log("navigate successfully")
      } else {
        this.message.create('error', '跳转失败');
        console.log("navigate failed")
      }
    })
  }
}
