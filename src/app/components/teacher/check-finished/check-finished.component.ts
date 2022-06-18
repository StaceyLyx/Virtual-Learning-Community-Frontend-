import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from "ng-zorro-antd/notification";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-check',
  templateUrl: './check-finished.component.html',
  styleUrls: ['./check-finished.component.css']
})
export class CheckFinishedComponent implements OnInit {
  isVisible = false;

  constructor(private message: NzMessageService,
              private notification: NzNotificationService,
              private modal: NzModalService,
              private router: Router) { }

  expandSet = new Set<number>();
  tableDataGroup: any = []
  tableDataPerson: any = []


  ngOnInit(): void {
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
      if (error.response.status === 400) {
        console.log(error);
      } else {
        console.log(error);
      }
    })
  }


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


  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
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
