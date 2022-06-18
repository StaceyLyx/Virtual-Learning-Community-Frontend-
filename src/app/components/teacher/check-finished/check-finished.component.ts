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
  templateUrl: './check-finished.component.html',
  styleUrls: ['./check-finished.component.css']
})

export class CheckFinishedComponent implements OnInit {

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
      name: '提交者',
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
      name: '操作',
      sortOrder: null,
      sortFn: null,
      sortDirections: [null],
    },{
      name: '下载',
      sortOrder: null,
      sortFn: null,
      sortDirections: [null],
    }
  ];

  tableDataGroup: any = []
  tableDataPerson: any = []

  ngOnInit(): void {
    console.log(sessionStorage.getItem("token"));
    // 获取团队任务
    axios.get('admin/retrieveTasks/unfinishedGroup', {
    }).then((response) => {
      if (response.status === 200) {
        console.log(response)
        this.tableDataGroup = response.data;
      }else{
        console.log(response);
      }
    }).catch((error) => {
      if (error.response.status === 400) {
        console.log(error);
      } else {
        console.log(error);
      }
    })

    // 获取个人任务
    axios.get('admin/retrieveTasks/unfinishedPersonal', {
    }).then((response) => {
      if (response.status === 200) {
        console.log(response)
        this.tableDataPerson = response.data
      } else {
        console.log(response);
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  downloadPersonalFile(userId: number, taskId: number, taskName: string) {
    axios.get('downloadFile/personalTask', {
      params: {
        taskId: taskId,
        userId: userId,
      },
      responseType: 'blob',
    }).then((response) => {
      console.log("response: ", response);
      const blob = new Blob([response.data])
      const fileName = taskName;
      const fileURL = window.URL.createObjectURL(blob);
      const fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', fileName);
      document.body.appendChild(fileLink);
      fileLink.click();
    }).catch((err) => {
      console.log(err.response);
    })
  }

  downloadGroupFile(groupId: number, taskName: string) {
    axios.get('downloadFile/groupTask', {
      params: {
        groupId: groupId,
        userId: sessionStorage.getItem("userId"),
      },
      responseType: 'blob',
    }).then((response) => {
      console.log("response: ", response);
      const blob = new Blob([response.data])
      const fileName = taskName;
      const fileURL = window.URL.createObjectURL(blob);
      const fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', fileName);
      document.body.appendChild(fileLink);
      fileLink.click();
    }).catch((err) => {
      console.log("error: ", err);
    })
  }

  passGroup(userId: number, groupId: number, taskId: number) {
    axios.put('admin/checkCompletion/groupTask', {
      userId: userId,
      groupId: groupId,
      taskId: taskId,
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        this.message.success("审核成功，该任务已通过");
      }
    }).catch((error) => {
      console.log(error);
      if (error.response.status === 400) {
        this.message.error("审核失败，请联系管理员");
      }
    })
  }

  passPerson(userId: number, taskId: number) {
    axios.put('admin/checkCompletion/personalTask', {
      userId: userId,
      taskId: taskId,
    }).then((response) => {
      console.log("response: ", response);
      if (response.status === 200) {
        this.message.success("审核成功，该任务已通过");
      }
    }).catch((error) => {
      console.log(error);
      if (error.response.status === 400) {
        this.message.error("审核失败，请联系管理员");
      }
    })
  }

  routerTo(path: string){
    if(path === "logout"){
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("token");
      path = '';
      this.message.info("登出成功");
    }
    this.router.navigateByUrl(path).then(r => {
      if (r) {
        console.log("navigate successfully")
      } else {
        console.log("navigate failed");
      }
    })
  }
}
