import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from "ng-zorro-antd/notification";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzTableSortFn, NzTableSortOrder} from "ng-zorro-antd/table";

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
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  constructor(private message: NzMessageService,
              private notification: NzNotificationService,
              private modal: NzModalService,
              private router: Router) { }

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
    }, {
      name: '操作',
      sortOrder: null,
      sortFn: null,
      sortDirections: [null],
    }
  ];

  tableData: any = []
  isVisible = false;

  ngOnInit(): void {
    axios.get('admin/retrieveTasks/uncheck', {
    }).then((response) => {
      if (response.status == 200) {
        this.tableData = response.data;
        console.log(this.tableData);
      } else {
        console.log(response);
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  pass(id: any) {
    const formData = new FormData();
    formData.append('taskId', id);

    axios.put('admin/checkFreeTask', formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
    ).then(response => {
      console.log("response: ", response)
      if(response.status === 200){
        this.message.success("审核通过！");
      }
    }).catch(error => {
      console.log("error: ", error.message)
      this.message.error("审核失败，请联系管理员查看原因");
    })
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  routerTo(path: string){
    this.router.navigateByUrl(path).then(r => {
      if (r) {
        console.log("navigate successfully")
      } else {
        console.log("navigate failed");
      }
    })
  }

}
