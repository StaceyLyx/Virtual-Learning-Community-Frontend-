import { Component, forwardRef, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import axios from 'axios';
import { ElMessageService } from 'element-angular';

@Component({
  selector: 'app-free-task',
  templateUrl: './free-task.component.html',
  styleUrls: ['./free-task.component.css']
})
export class FreeTaskComponent implements OnInit {
  freeTask: any;

  constructor( @Inject(forwardRef(() => FormBuilder)) private formBuilder: FormBuilder, private message: ElMessageService) { }

  ngOnInit(): void {
    this.freeTask =this.formBuilder.group({
    content:['',[Validators.required]],
    taskExp:['',[Validators.required]],
  
  })
  }
  onSubmitFree(){
    axios.post( 'http://localhost:8081/createFreeTask',{
       task: this.freeTask.controls['content'].value,
       ex:this.freeTask.controls['taskExp'].value,
       userId:0
    }).then((response) =>{
      if(response.status == 200){   
        this.message.setOptions({ showClose: true })
        this.message.success('任务布置成功')
      }
    }).catch((error) =>{
      console.log(error)
      if(error.response.status == 400){
        this.message.setOptions({ showClose: true })
        this.message.error("任务布置失败")
      }else{
        this.message.setOptions({ showClose: true })
        this.message.error("后端错误")
      }
    })
  }

}
