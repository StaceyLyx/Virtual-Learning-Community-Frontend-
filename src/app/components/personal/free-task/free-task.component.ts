import { Component, forwardRef, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import axios from 'axios';
import { ElMessageService } from 'element-angular';
import {NzCascaderOption} from "ng-zorro-antd/cascader";
import {NzButtonSize} from "ng-zorro-antd/button";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-free-task',
  templateUrl: './free-task.component.html',
  styleUrls: ['./free-task.component.css']
})
export class FreeTaskComponent implements OnInit {

  constructor( @Inject(forwardRef(() => FormBuilder)) private formBuilder: FormBuilder,
               private message: NzMessageService,
               private router: Router) { }

  task: FormGroup = new FormGroup({
    name: new FormControl(null),    // 任务名称
    class: new FormControl(null),   // 所属课堂
    ddl: new FormControl(null),      // 截止日期
    type: new FormControl(null),    // 任务类型
    ev: new FormControl(null),      // 任务经验值
    description: new FormControl(null),      // 任务描述
  })

  classes = [
    {
      value: '高级Web',
      label: '高级Web',
      isLeaf: true
    },
    {
      value: '计算机图形学',
      label: '计算机图形学',
      isLeaf: true
    }
  ];
  types = [
    {
      value: 2,
      label: '我要提问',
      isLeaf: true
    },{
      value: 3,
      label: '我要出题',
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
      type: [null, [Validators.required]],
      ev: [null, [Validators.required]],
      description: [null, [Validators.required]],
    })

    // 获取所有课堂
    setTimeout(() => {
      this.classOptions = this.classes;
      this.typeOptions = this.types;
    }, 100)

    window.addEventListener("mousemove", () => {
      let temp = 0
      Object.values(this.task.controls).forEach(control => {
        if (control.valid) {
          temp += 16.5
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
    this.status.status = "success";
    this.status.title = "任务发布成功！去课堂列表中查看你的任务吧！";
    this.status.subTitle = "任务名：高级Web 任务号：1";
    this.status.hidden = false;
    // axios.post( 'http://localhost:8081/createFreeTask',{
    //    task: this.freeTask.controls['content'].value,
    //    ex:this.freeTask.controls['taskExp'].value,
    //    userId:0
    // }).then((response) =>{
    //   if(response.status == 200){
    //     this.message.success('任务布置成功')
    //   }
    // }).catch((error) =>{
    //   console.log(error)
    //   if(error.response.status == 400){
    //     this.message.setOptions({ showClose: true })
    //     this.message.error("任务布置失败")
    //   }else{
    //     this.message.setOptions({ showClose: true })
    //     this.message.error("后端错误")
    //   }
    // })
  }

}
