import {Component, OnInit, ViewChild} from '@angular/core';
import axios from "axios";
import {ActivatedRoute, Router} from "@angular/router";
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

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private notification: NzNotificationService,
              private message: NzMessageService) { }

  tableData: any = []
  isVisible = false;
  className: string = "";
  classId: number = 0;

  acceptedTask: any = [];

  ngOnInit(): void {

    // 获取课堂id
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.classId = queryParams['classId'];
      this.className = queryParams['className'];
    })

    // 获取课堂任务
    axios.get('retrieveTasks/class', {
      params: {
        classId: this.classId,
      }
    }).then((response) =>{
      console.log("response", response)
      if(response.status === 200){
        this.tableData = response.data.result;

        // 获取该用户接受过的任务
        axios.get('retrieveTasks/user', {
          params: {
            userId: sessionStorage.getItem("userId"),
          }
        }).then((res) =>{
          console.log(res)
          if(res.status === 200){
            this.acceptedTask = res.data;

            // 查看是否有用户接受过的任务
            for(let i = 0; i < this.tableData.length; ++i){
              let taskId = this.tableData[i].id;
              for(let j = 0; j < this.acceptedTask.length; ++j){
                if(this.acceptedTask[j].id === taskId){
                  // 接受过
                  this.tableData[i].validity = 4;
                  break;
                }
              }
            }

          }else{
            console.log(res);
          }
        }).catch((error) =>{
          console.log("error: " + error);
        })
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

  groups: any = [];
  acceptTask(taskId: number, teamSize: number){
    if(teamSize == 1){
      // 接受个人任务
      axios.post('personalTaskOn', {
        taskId: taskId,
        userId: sessionStorage.getItem("userId"),
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
        if(error.response.status === 400){
          this.notification.create(
            'error',
            'Oops！',
            "已经接受过该任务，前往“我的任务”去查看吧！"
          )
        }else{
          this.notification.create(
            'error',
            'Oops！',
            "其他错误"
          )
        }
      })
    }else{
      // 接收团队任务
      // 获得当前团队
      axios.post('groupTaskList', {
        taskId: taskId,
        userId: sessionStorage.getItem("userId"),
      }).then(response => {
        console.log("response: ", response)
        if(response.status === 200){
          this.groups = response.data.result;
          this.isVisible = true;
        }
      }).catch(error => {
        if(error.response.status === 400){
          this.notification.create(
            'error',
            'Oops！',
            "已经接受过该任务，前往“我的任务”去查看吧！"
          )
        }else{
          this.notification.create(
            'error',
            'Oops！',
            "其他错误"
          )
        }
      })
    }
  }

  acceptGroupTask(groupId: number){
    axios.post('groupTaskOn', {
      groupId: groupId,
      userId: sessionStorage.getItem("userId"),
    }).then(response => {
      console.log("response: ", response)
      if(response.status === 200){
        this.notification.create(
          'success',
          '接受团队任务',
          '去“我的任务”查看任务组队情况吧！'
        )
      }
    }).catch(error => {
      console.log("error: ", error)
      if(error.response.status === 400){
        this.notification.create(
          'error',
          'Oops！',
          "该小组已满员啦！去看看是否你已经在该小组中或重新选择一个小组吧"
        )
      }else{
        this.notification.create(
          'error',
          'Oops！',
          "其他错误"
        )
      }
    })
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  routerTo(path: string){
    if(path === 'class'){
      this.router.navigate(["class"], {
        queryParams: {
          classId: this.classId,
          className: this.className,
        }
      }).then(r => {
        if (r) {
          console.log("navigate to class")
        } else {
          this.message.create('error', '跳转失败');
          console.log("navigate failed")
        }
      })
    }else{
      this.router.navigateByUrl(path).then(r => {
        if (r) {
          console.log("navigate successfully")
        } else {
          this.message.create('error', '跳转失败');
          console.log("navigate failed");
        }
      })
    }
  }
}
