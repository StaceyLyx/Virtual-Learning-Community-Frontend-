import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import axios from 'axios';
import {ElMessageService} from "element-angular";
import {NzMessageService} from "ng-zorro-antd/message";
import {SocketServiceService} from "../../services/socket-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  infoForm: FormGroup = new FormGroup({
    username: new FormControl(null),
    password: new FormControl(null)
  })

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private message: NzMessageService) {
  }

  ngOnInit(): void {
    this.infoForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  submit() {
    this.router.navigateByUrl("communityScene").then(r => {
                if(r){
                  console.log("navigate to community")
                }else{
                  this.message.create('warning', '跳转失败')
                  console.log("navigate failed")
                }
              })
    // if(this.infoForm.valid) {
    //     axios.post(  'login',{
    //         username: this.infoForm.controls['username'].value,
    //         password: this.infoForm.controls['password'].value,
    //     }).then((response) =>{
    //       console.log("response: ", response)
    //       if(response.status === 200){
    //         // 登录成功
    //         sessionStorage.setItem("userId", response.data.userid)
    //         sessionStorage.setItem("token", response.data.token)
    //         this.message.create('success', '登陆成功！')
    //         this.router.navigateByUrl("tasks").then(r => {
    //           if(r){
    //             console.log("navigate to class")
    //           }else{
    //             this.message.create('warning', '跳转失败')
    //             console.log("navigate failed")
    //           }
    //         })
    //       }
    //     }).catch((error) =>{
    //       console.log(error);
    //       if(error.response.status == 400){
    //         this.message.create('error', "用户名与密码错误")
    //       }
    //     })
    //   }else{
    //     Object.values(this.infoForm.controls).forEach(control =>{
    //       if(control.invalid){
    //         control.markAsDirty();
    //         control.updateValueAndValidity();
    //       }
    //     })
    //   }
  }

}
