import {Component, OnInit, ViewChild} from '@angular/core';
import axios from "axios";
import {ElMessageService} from "element-angular";
import {Router} from "@angular/router";
import {TaskServiceService} from "../../services/task-service.service";
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
              private taskService: TaskServiceService) { }

  expandSet = new Set<number>();
  tableData: any = []
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

  ngOnInit(): void {
    this.getTaskList();
  }

  getTaskList() {
    this.tableData = this.taskService.getTasks()
  }

  disabled(value: number): boolean{
    return value !== 1;
  }

  acceptTasks(taskId: number, teamSize: number){
    if(teamSize == 1){
      this.notification.create(
        'success',
        '接受个人任务',
        '去“我的任务”里完成任务吧！'
      )
    }else{
      this.notification.create(
        'success',
        '接受团队任务',
        '去“我的任务”查看任务进展情况吧！'
      )
    }
  }
}
