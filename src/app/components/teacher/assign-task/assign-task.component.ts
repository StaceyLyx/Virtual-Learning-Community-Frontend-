import { Component, forwardRef, Inject, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import axios from 'axios'
import {FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import {NzCascaderOption} from "ng-zorro-antd/cascader";
import {NzMessageService} from "ng-zorro-antd/message";
import {formatDate} from "@angular/common";
import {NzButtonSize} from "ng-zorro-antd/button";

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.css']
})
export class AssignTaskComponent implements OnInit {

  constructor( @Inject(forwardRef(() => FormBuilder)) private formBuilder: FormBuilder,
               private message: NzMessageService,
               private router: Router) { }

  task: FormGroup = new FormGroup({
    name: new FormControl(null),    // 任务名称
    class: new FormControl(null),   // 所属课堂
    ddl: new FormControl(null),      // 截止日期
    optional: new FormControl(null),    // 任务类型
    ev: new FormControl(null),      // 任务经验值
    description: new FormControl(null),      // 任务描述
    teamSize: new FormControl(null),    // 任务人数
  })

  classes = [
    {
      value: 0,
      label: "请选择以下课堂",
      isLeaf: true
    }
  ];

  optional = [
    {
      value: 0,
      label: '必修',
      isLeaf: true
    },{
      value: 1,
      label: '选修',
      isLeaf: true
    }
  ]
  size: NzButtonSize = 'large';
  evDefault: string = "请选择或填写（1~10）"
  nameDefault: string = "请填写任务名称"
  percent: number = 0

  classOptions: NzCascaderOption[] | null = null;
  typeOptions: NzCascaderOption[] | null = null;

  ngOnInit(): void {
    this.task = this.formBuilder.group({
      name: [null, [Validators.required]],
      class: [null, [Validators.required]],
      ddl: [null, [Validators.required]],
      optional: [null, [Validators.required]],
      ev: [null, [Validators.required]],
      description: [null, [Validators.required]],
      teamSize: [null, [Validators.required]],
    })

    // 获取课堂列表
    axios.get('retrieveClasses', {}).then(response => {
      console.log("response: ", response)
      if(response.status === 200){
        for(let i = 0; i < response.data.result.length; ++i){
          this.classes = [
            ...this.classes,
            {
              value: response.data.result[i].id,
              label: response.data.result[i].courseName,
              isLeaf: true
            }
          ]
        }
        console.log("class: " + this.classes);
        setTimeout(() => {
          this.classOptions = this.classes;
          this.typeOptions = this.optional;
        }, 100)
      }
    }).catch(error => {
      console.log("error: ", error);
    })

    window.addEventListener("mousemove", () => {
      let temp = 0
      Object.values(this.task.controls).forEach(control => {
        if (control.valid) {
          temp += 16.5;
          if(temp > 100){
            temp = 100;
          }
        }
      });
      this.percent = temp;
    })
  }

  status: any = {
    hidden: true,
    status: null,
    title: null,
    subTitle: null,
  }

  onSubmit(){
    if(this.task.valid) {
      if(this.task.value.teamSize > 1){
        // 发布团队任务
        axios.post( 'admin/createGroupTask',{
          classId: String(this.task.value.class[0]),
          ddl: formatDate(this.task.value.ddl, 'yyyy-MM-dd hh:mm:ss', 'zh-Hans'),
          description: this.task.value.description,
          ev: this.task.value.ev,
          name: this.task.value.name,
          optional: String(this.task.value.optional[0]),
          team_size: String(this.task.value.teamSize),
          userId: String(sessionStorage.getItem("userId")),
        }).then((response) =>{
          if(response.status === 200){
            this.message.success("任务发布成功");
          }
        }).catch((error) =>{
          console.log(error.response)
          if(error.response.status === 400){
            this.message.error("任务布置失败，请重试");
          }else{
            this.message.error("后端错误")
          }
        })
      }else{
        // 发布个人任务
        axios.post( 'admin/createPersonalTask',{
          classId: String(this.task.value.class[0]),
          ddl: formatDate(this.task.value.ddl, 'yyyy-MM-dd hh:mm:ss', 'zh-Hans'),
          description: this.task.value.description,
          ev: this.task.value.ev,
          name: this.task.value.name,
          optional: String(this.task.value.optional[0]),
          team_size: String(1),
          userId: String(sessionStorage.getItem("userId")),
        }).then((response) =>{
          if(response.status === 200){
            this.message.success("任务发布成功");
          }
        }).catch((error) =>{
          console.log(error.response)
          if(error.response.status === 400){
            this.message.error("任务布置失败，请重试");
          }else{
            this.message.error("后端错误")
          }
        })
      }
    }else{
      Object.values(this.task.controls).forEach(control =>{
        if(control.invalid){
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      })
    }
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
        this.message.create('error', '跳转失败');
        console.log("navigate failed");
      }
    })
  }
}


