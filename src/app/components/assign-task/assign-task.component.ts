import { Component, forwardRef, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.css']
})
export class AssignTaskComponent implements OnInit {
  taskForm: any
  
  public taskInfo: any = {
    taskName: '',
    taskClass: '',
    taskExp: '',
    taskTime: '',
    taskProperty: '',
    taskNecessity: ''
  }


  constructor(public http: HttpClient, private route: ActivatedRoute, @Inject(forwardRef(() => FormBuilder)) private formBuilder: FormBuilder) {
    /*   this.taskForm = new FormGroup({
        taskName: new FormControl(''),
        taskClass: new FormControl(''),
        taskExp: new FormControl(''),
        taskTime: new FormControl(''),
        property: new FormControl(''),
        necessity: new FormControl('')
      }) */

  }

  ngOnInit(): void {
    this.taskForm=this.formBuilder.group({
      taskName:['',[Validators.required]],
      taskClass:[null,[Validators.required]],
      taskExp:[null,[Validators.required]],
      taskTime:[null,[Validators.required]],
      taskProperty:[null,[Validators.required]],
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
  onSubmit() {
   
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    // alert('success')
    //console.log(this.taskInfo)
    if(!this.taskForm.valid){
      alert("fail")
    }
    else{alert("success")}
    //'https://www.fastmock.site/mock/aefaf6d191fd75512768a9b71ca2fea4/study/assignTask'
     axios.post('https://localhost:8181/personaltask').then(res => {

      console.log(this.taskInfo)
      console.log(res);
    
    })
    /*   let taskNameDom:any=document.getElementById('taskName')
      console.log(taskNameDom.value) 
      */
    /*  var api = "https://www.fastmock.site/mock/aefaf6d191fd75512768a9b71ca2fea4/study/assignTask";
    this.http.post(api,this.taskInfo,httpOptions).subscribe(response => {
     console.log(response);
 }) */

  }

}
