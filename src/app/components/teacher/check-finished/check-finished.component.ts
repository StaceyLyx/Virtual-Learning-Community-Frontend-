import { Component, OnInit } from '@angular/core';
import { AnyForUntypedForms } from '@angular/forms';
import axios from 'axios';
import { ElMessageService } from 'element-angular';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from "ng-zorro-antd/notification";
@Component({
  selector: 'app-check',
  templateUrl: './check-finished.component.html',
  styleUrls: ['./check-finished.component.css']
})
export class CheckFinishedComponent implements OnInit {
  isVisible = false;

  constructor(private message: ElMessageService, private notification: NzNotificationService,private modal: NzModalService) { }

  expandSet = new Set<number>();
  tableDataGroup: any = [{
    id: 1,
    name: '高级web',
    optional: 1,
    teamSize: 4,
    ddl: '2021-2-1',
  }, {
    id: 2,
    name: '图形学',
    optional: 1,
    teamSize: 5,
    ddl: '2021-2-1',
  }]
  tableDataPerson: any = []
  tableDataFree: any = [
    {
      id: 3,
      name: '3d技术',
      type: '提问',
      class: '高级web',
      ev: 5,
      ddl: '2021-6-15',
      description: '为什么xxx'
    }
  ]

  ngOnInit(): void {
    //this.getTaskGroup();
    this.getTaskPerson();
  }

  getTaskGroup() {
    //store的USERID AUTHORITYID
    //http://localhost:8081/admin/retrieveTasks/unfinishedGroup

    axios.get('http://localhost:8081/admin/retrieveTasks/unfinishedGroup', {
      params: {
        userId: 0,

      }
    }).then((response) => {
      if (response.status == 200) {
        console.log(response)
        this.tableDataGroup = response.data.tableData
        console.log(this.tableDataGroup)
        for (let i = 0; i < response.data.result.length; ++i) {
          this.tableDataGroup.push(response.data.result[i]);
        }

      } else {
        console.log(response);
      }
    }).catch((error) => {
      if (error.status == 400) {
        this.message.setOptions({ showClose: true });
        this.message.error("无任务");
        console.log(error);
      } else {
        console.log(error);
      }
    })
  }

  getTaskPerson() {
    //store的USERID AUTHORITYID
    //http://localhost:8081/admin/retrieveTasks/unfinishedGroup
    axios.get('http://localhost:8081/admin/retrieveTasks/unfinishedPersonal', {
      params: {
        userId: 0,

      }
    }).then((response) => {
      if (response.status == 200) {
        console.log(response)
        this.tableDataPerson = response.data.tableData
        console.log(this.tableDataPerson)
        for (let i = 0; i < response.data.result.length; ++i) {
          this.tableDataPerson.push(response.data.result[i]);
        }

      } else {
        console.log(response);
      }
    }).catch((error) => {
      if (error.status == 400) {
        this.message.setOptions({ showClose: true });
        this.message.error("无任务");
        console.log(error);
      } else {
        console.log(error);
      }
    })
  }
  //?
  checkFile(id: any, name: string) {
    axios.post('', { params: { userId: 0, } }, { responseType: 'blob' })
      .then((res) => {
        const { data, headers } = res
        const fileName = headers['content-disposition'].replace(/\w+;filename=(.*)/, '$1')
        const blob = new Blob([data], { type: headers['content-type'] })
        let dom = document.createElement('a')
        let url = window.URL.createObjectURL(blob)
        dom.href = url
        dom.download = decodeURI(fileName)
        dom.style.display = 'none'
        document.body.appendChild(dom)
        dom.click()
        window.URL.revokeObjectURL(url)
      }).catch((err) => { })
  }

  passGroup(id: any, name: string) {
    this.tableDataGroup = this.tableDataGroup.filter((d: { id: any; }) => d.id !== id);
    console.log(id)
    axios.post('http://localhost:8081/admin/checkCompletion/groupTask', {
      params: {
        taskId: id,
        userId: 0,

      }
    }).then((response) => {
      if (response.status == 200) {
        console.log("审核完成")
        this.notification.create(
          'success',
          '审核完成',
          '任务完成审核通过！'
        )
      } else {
        console.log(response);
      }
    }).catch((error) => {
      if (error.status == 400) {
        this.message.setOptions({ showClose: true });
        this.message.error("审核通过失败");
        console.log(error);
        this.notification.create(
          'fail',
          '审核完成',
          '审核不通过！'
        )
      } else {
        console.log(error);
      }
    })
  }

  passPerson(id: any, name: string) {
    //delete 
    this.tableDataPerson = this.tableDataPerson.filter((d: { id: any; }) => d.id !== id);
    console.log(id)
    axios.post('http://localhost:8081/admin/checkCompletion/personTask', {
      params: {
        taskId: id,
        userId: 0,
      }
    }).then((response) => {
      if (response.status == 200) {
        console.log("审核完成")
        this.notification.create(
          'success',
          '审核完成',
          '任务完成审核通过！'
        )
      } else {
        console.log(response);
      }
    }).catch((error) => {
      if (error.status == 400) {
        this.message.setOptions({ showClose: true });
        this.message.error("审核通过失败");
        console.log(error);
        this.notification.create(
          'fail',
          '审核完成',
          '审核不通过！'
        )
      } else {
        console.log(error);
      }
    })
  }
  passFree(id: any, name: string) {
    this.tableDataFree = this.tableDataFree.filter((d: { id: any; }) => d.id !== id);
    console.log(id)
    axios.post('http://localhost:8081/checkCompletion/freeTask', {
      params: {
        taskId: id,
        userId: 0,
      }
    }).then((response) => {
      if (response.status == 200) {
        console.log("审核完成")
        this.notification.create(
          'success',
          '审核完成',
          '任务完成审核通过！'
        )
      } else {
        console.log(response);
      }
    }).catch((error) => {
      if (error.status == 400) {
        this.message.setOptions({ showClose: true });
        this.message.error("审核通过失败");
        console.log(error);
        this.notification.create(
          'fail',
          '审核完成',
          '审核不通过！'
        )
      } else {
        console.log(error);
      }
    })
  }
  checkFree(id: any, name: string, description: string) {
    console.log(id)
    console.log(description)
    //this.isVisible=true
    this.modal.info({
      nzTitle: '任务内容',
      nzContent: description,
      nzOnOk: () => console.log('Info OK')
    });
  }

  

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }
}