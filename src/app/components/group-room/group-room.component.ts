import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-group-room',
  templateUrl: './group-room.component.html',
  styleUrls: ['./group-room.component.css']
})
export class GroupRoomComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private message: NzMessageService) { }

  taskId: number | undefined
  userId: number | undefined

  task: any;

  data = [
    {
      author: 'Sun Yue',
      content: '评论'
    },
    {
      author: 'Liu Peiqi',
      content: '进行一个评论'
    }
  ];

  submitting = false;
  inputValue = '';

  ngOnInit(): void {

    // 获取任务id
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.taskId = queryParams['taskId'];
    })
    // 获取用户id
    this.userId = 3

    this.task = {
      name: '高级web',
      ev: 1,
      teamSize: 4,
      publisherName: 'tuna',
      description: '123123',
    }
  }

  handleSubmit(): void {
    this.submitting = true;
    this.data = [
      ...this.data,
      {
        author: 'Liao Yanxin',
        content: this.inputValue,
      }
    ]
    this.submitting = false;
    this.inputValue = '';
  }

  routerTo(path: string){
    this.router.navigateByUrl(path).then(r => {
      if (r) {
        console.log("navigate successfully")
      } else {
        console.log("local index")
      }
    })
  }

}
