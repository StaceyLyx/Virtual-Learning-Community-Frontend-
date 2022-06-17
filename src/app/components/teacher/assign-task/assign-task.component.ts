import { Component, forwardRef, Inject, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import axios from 'axios'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import {ElMessageService} from "element-angular";
import {NzCascaderOption} from "ng-zorro-antd/cascader";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.css']
})
export class AssignTaskComponent implements OnInit {

  percent: number = 0
  taskFormPerson: any
  taskFormGroup: any
  //taskForm!: FormGroup;
  public taskInfo1: any  = {
    taskName: '',
    taskClass: '',
    taskExp: '',
    taskNum:'',
    taskTime: '',
    taskProperty: '',
    taskNecessity: ''
  }
  public taskInfo2: any = {
    taskName: '',
    taskClass: '',
    taskExp: '',
    taskNum:'',
    taskTime: '',
    taskProperty: '',
    taskNecessity: ''
  }
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
  optional = [
    {
      value: '0',
      label: '必修',
      isLeaf: true
    },
    {
      value: '1',
      label: '选修',
      isLeaf: true
    }
  ];
  classOptions: NzCascaderOption[] | null = null;
  taskOptional:NzCascaderOption[] | null = null;
  constructor(public http: HttpClient,
              private route: ActivatedRoute,
              @Inject(forwardRef(() => FormBuilder)) private formBuilder: FormBuilder,
              private message: NzMessageService,
              private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.classOptions = this.classes;
      this.taskOptional = this.optional;
    }, 100)
    this.taskFormPerson=this.formBuilder.group({
      taskName:['',[Validators.required]],
      taskClass:[null,[Validators.required]],
      taskExp:[null,[Validators.required]],
      //taskNum:[null,[Validators.required]],
      //taskTime:[null,[Validators.required]],
       taskTime: [null],
      //taskProperty:[null,[Validators.required]],
      taskNecessity:[null,[Validators.required]],
    })
    this.taskFormGroup=this.formBuilder.group({
      taskName:['',[Validators.required]],
      taskClass:[null,[Validators.required]],
      taskExp:[null,[Validators.required]],
      taskNum:[null,[Validators.required]],
      //taskTime:[null,[Validators.required]],
      taskTime: [null],
      //taskProperty:[null,[Validators.required]],
      taskNecessity:[null,[Validators.required]],
    })

    //console.log(this.route.snapshot.queryParams)

  }
    /* passwordValidator(info:FormGroup):any{
      let nicknameValid=this.taskForm.get("taskName").valid;
      console.log("nickname是否校验通过"+nicknameValid);
    if(nicknameValid==false){
      return {"password":{description:"密码与确认密码不一致"}};
    }
 } */
  onSubmitPerson() {

   /*
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }; */
    // alert('success')
    //console.log(this.taskInfo)
    /* if(!this.taskFormPerson.valid){
      alert("fail")
    }
    else{alert("success")} */
    //https://localhost:8181/personaltask
    //'https://www.fastmock.site/mock/aefaf6d191fd75512768a9b71ca2fea4/study/assignTask'
      /* axios.post('https://www.fastmock.site/mock/aefaf6d191fd75512768a9b71ca2fea4/study/assignTask').then(res => {

      console.log(this.taskInfo)
      console.log(res);

    })

    */
    axios.post(  'api/createPersonalTask',{
      name: this.taskFormPerson.controls['taskName'].value,
      ddl: this.taskFormPerson.controls['taskTime'].value,
      taskClass: this.taskFormGroup.controls['taskClass'].value,
     ev: this.taskFormPerson.controls['taskExp'].value,
     optional: this.taskFormPerson.controls['taskNecessity'].value,
      userId:0
    }).then((response) =>{
      if(response.status == 200){
        this.message.success('任务布置成功')
      }
    }).catch((error) =>{
      console.log(error)
      if(error.response.status == 400){
        this.message.error("任务布置失败")
      }else{
        this.message.error("后端错误")
      }
    })
   // console.log(response);
  }
  onSubmitTeam() {
   /*    if(!this.taskFormGroup.valid){
       alert("fail")
     }
     else{alert("success")} */
    //布置任务人的ID
     axios.post(  'api/createGroupTask',{
       name: this.taskFormGroup.controls['taskName'].value,
       taskClass: this.taskFormGroup.controls['taskClass'].value,
       ddl: this.taskFormGroup.controls['taskTime'].value,
       ev: this.taskFormGroup.controls['taskExp'].value,
       teamsize: this.taskFormGroup.controls['taskNum'].value,
       //taskProperty: this.taskFormGroup.controls['taskProperty'].value,
       optional: this.taskFormGroup.controls['taskNecessity'].value,
       userId:0
     }).then((response) =>{
       if(response.status == 200){
         this.message.success('任务布置成功')
       }
     }).catch((error) =>{
       console.log(error)
       if(error.response.status == 400){
         this.message.error("任务布置失败")
       }else{
         this.message.error("后端错误")
       }
     })

     console.log(this.taskInfo2)
    // console.log(response);
   }

  routerTo(path: string){
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


