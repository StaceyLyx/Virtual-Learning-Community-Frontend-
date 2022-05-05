import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import axios from 'axios';
import {ElMessageService} from "element-angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  infoForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  usernameY: Boolean = false;
  passwordY: Boolean = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private message: ElMessageService) {
  }

  ngOnInit(): void {
    this.infoForm = this.formBuilder.group({
      username: ['', [this.usernameCheck]],
      password: ['', [this.passwordCheck]]
    })
  }

  submit() {
    if(this.usernameY && this.passwordY) {
        axios.post(  'api/login',{
            username: this.infoForm.controls['username'].value,
            password: this.infoForm.controls['password'].value,
        }).then((response) =>{
          console.log(response)
          if(response.status == 200){
            this.message.setOptions({ showClose: true })
            this.message.success('登陆成功！')
            this.router.navigateByUrl("scene").then(r => {
              if(r){
                console.log("navigate to scene")
              }else{
                this.message.setOptions({ showClose: true })
                this.message.warning('跳转失败')
                console.log("navigate failed")
              }
            })
          }
        }).catch((error) =>{
          console.log(error);
          if(error.response.status == 400){
            this.message.setOptions({ showClose: true })
            this.message.error("用户名与密码错误")
          }
        })
      }else{
        this.message.setOptions({ showClose: true })
        this.message.error('请输入用户名与密码')
      }
  }



  handle(index: string): void {
    console.log(index)
  }

  statusCtrl(item: string): string {
    if (!this.infoForm.controls[item]) return ""
    const control: AbstractControl = this.infoForm.controls[item]
    if (control.dirty && control.hasError('message') && control.errors != undefined){
      return control.errors['message']
    }else{
      return ''
    }
  }

  messageCtrl(item: string): string {
    if (!this.infoForm.controls[item]) return ""
    const control: AbstractControl = this.infoForm.controls[item]
    if (control.dirty && control.hasError('message') && control.errors != undefined){
      return control.errors['message']
    }else{
      return ''
    }
  }

  private usernameCheck = (control: FormControl): any => {
    if (!control.value) {
      return { status: 'error', message: '账户是必填项' }
    }
    this.usernameY = true;
    return { status: 'success' }
  }

  private passwordCheck = (control: FormControl): any => {
    if (!control.value) {
      return { status: 'error', message: '密码是必填项' }
    }
    this.passwordY = true;
    return { status: 'success' }
  }

}
