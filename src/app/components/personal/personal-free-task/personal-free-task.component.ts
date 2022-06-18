import { Component, OnInit } from '@angular/core';
import axios from "axios";
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
  selector: 'app-personal-free-task',
  templateUrl: './personal-free-task.component.html',
  styleUrls: ['./personal-free-task.component.css']
})
export class PersonalFreeTaskComponent implements OnInit {

  constructor(private message: NzMessageService) { }

  tableData: any = []

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

  ngOnInit(): void {
    const formData = new FormData();
    formData.append('userId', <string>sessionStorage.getItem("userId"));

    axios.post('retrieveTasks/unfinishedFree',
      {
        userId: sessionStorage.getItem("userId"),
      }
    ).then(response => {
      console.log("response: ", response)
      if(response.status === 200){
        this.tableData = response.data;
      }
    }).catch(error => {
      console.log("error: ", error.response.data)
      this.message.error("任务获取失败");
    })
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  downloadFile(userId: number, taskId: number, taskName: string, teamSize: number) {
    if(teamSize === 1){
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
    }else{
      axios.get('downloadFile/groupTask', {
        params: {
          groupId: taskId,
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
  }

  pass(userId: number, groupId: number, taskId: number, teamSize: number) {
    if(teamSize === 1){
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
    }else{
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
  }

}
