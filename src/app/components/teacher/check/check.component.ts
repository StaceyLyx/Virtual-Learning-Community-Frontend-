import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ElMessageService } from 'element-angular';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from "ng-zorro-antd/notification";
@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  constructor(private message: ElMessageService, private notification: NzNotificationService, private modal: NzModalService) { }

  expandSet = new Set<number>();
  tableDataGroup: any = [{
    id: 1,
    name: '高级web',
    type: "提问",
    class: '高级web',
    ev: 1,
    ddl: '2021-2-1',
    description: 'web技术解决',
  }, {
    id: 2,
    name: '图形学',
    type: "出题",
    class: '计算机图形学',
    ev: 10,
    ddl: '2021-2-1',
    description: '图形学'
  }]
  //tableDataPerson: any = []
  isVisible = false;

  ngOnInit(): void {
    this.getTaskGroup();
    //this.getTaskPerson();
  }

  getTaskGroup() {
    //store的USERID AUTHORITYID
    //http://localhost:8081/admin/retrieveTasks/unfinishedGroup
    axios.get('http://localhost:8081/admin/retrieveTasks/uncheck', {
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

  // getTaskPerson() {
  //   //store的USERID AUTHORITYID
  //  //http://localhost:8081/admin/retrieveTasks/unfinishedGroup
  //   axios.get('http://localhost:8081/admin/retrieveTasks/unfinishedPersonal', {
  //     params: {
  //       userId: 0,

  //     }
  //   }).then((response) =>{
  //     if(response.status == 200){
  //       console.log(response)
  //       this.tableDataPerson = response.data.tableData
  //       console.log(this.tableDataPerson)
  //       for(let i = 0; i < response.data.result.length; ++i){
  //         this.tableDataPerson.push(response.data.result[i]);
  //       }

  //     }else{
  //       console.log(response);
  //     }
  //   }).catch((error) =>{
  //     if(error.status == 400){
  //       this.message.setOptions({showClose: true});
  //       this.message.error("无任务");
  //       console.log(error);
  //     }else{
  //       console.log(error);
  //     }
  //   })
  // }


  passGroup(id: any, name: string) {
    //delete 
    this.tableDataGroup = this.tableDataGroup.filter((d: { id: any; }) => d.id !== id);
    console.log(id)
    this.notification.create(
      'success',
      '审核完成',
      '审核通过！'
    )
    axios.post('http://localhost:8081/admin/checkFreeTask', {
      params: {
        taskId: id,
        userId: 0,
        //groupId:0
      }
    }).then((response) => {
      if (response.status == 200) {
        console.log("审核完成")
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
  // passPerson(id:any,name:string){
  //   //delete 
  //   this.tableDataPerson = this.tableDataPerson.filter((d: { id: any; }) => d.id !== id);
  //   console.log(id)
  //   axios.post('http://localhost:8081/admin/checkCompletion/personTask', {
  //     params: {
  //       taskId:0,
  //       userId:0,
  //     }
  //   }).then((response) =>{
  //     if(response.status == 200){
  //      console.log("审核完成")
  //     }else{
  //       console.log(response);
  //     }
  //   }).catch((error) =>{
  //     if(error.status == 400){
  //       this.message.setOptions({showClose: true});
  //       this.message.error("审核通过失败");
  //       console.log(error);
  //     }else{
  //       console.log(error);
  //     }
  //   })
  // }

}