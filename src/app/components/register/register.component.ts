import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ElMessageService} from "element-angular";
import axios from "axios";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  url = "localhost:8181"

  infoForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    passwordConfirm: new FormControl('')
  })

  usernameY: Boolean  = false
  emailY: Boolean  = false
  passwordY: Boolean  = false
  passwordConfirmY: Boolean  = false

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private message: ElMessageService) { }

  ngOnInit(): void {
    this.infoForm = this.formBuilder.group({
      username: ['', [this.usernameCheck]],
      email: ['', [this.emailCheck]],
      password: ['', [this.passwordCheck]],
      passwordConfirm: ['', this.passwordConfirmCheck]
    })
  }

  submit(): void{
    if(this.usernameY && this.emailY && this.passwordY && this.passwordConfirmY){
      axios({
        method: 'post',
        url: this.url + '/register/submit',
        data: {
          username: this.infoForm.controls['username'].value,
          email: this.infoForm.controls['email'].value,
          password: this.infoForm.controls['password'].value
        }
      }).then((response) =>{
        if(response.status == 201){   // 注册成功，默认跳转
          this.message.setOptions({ showClose: true })
          this.message.success('注册成功，欢迎来到学习社区')
          this.router.navigateByUrl("scene").then(r => {
            if(r){
              console.log("navigate to scene")
            }else{
              this.message.setOptions({ showClose: true })
              this.message.error('跳转失败')
              console.log("navigate failed")
            }
          })
        }
      }).catch((error) =>{
        if(error.response.status == 400){
          this.message.setOptions({ showClose: true })
          this.message.error("注册失败")
        }else{
          this.message.setOptions({ showClose: true })
          this.message.error("后端错误")
        }
      })
    }else{
      this.message.setOptions({ showClose: true })
      this.message.error('注册失败，请修改注册信息')
    }
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

    let msg = ""
    // 检查账户是否被注册过
    axios({
      method: 'post',
      url: this.url + 'register/username',
      data: {
        username: this.infoForm.controls['username'].value
      }
    }).then((response) =>{
      if(response.status == 200){
        this.usernameY = true
      }
    }).catch((error) =>{
      if(error.status == 400){
        msg = "该用户名已被注册"
      }else{
        msg = error.data
      }
      this.usernameY = false
    })

    if(this.usernameY){
      return { status: 'success' }
    }else{
      return { status: 'error', message: msg }
    }
  }

  private emailCheck = (control: FormControl): any => {
    const mailReg: RegExp = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.]){1,2}[A-Za-z\d]{2,5}$/g
    let msg = ""
    if(control.value != ""){
      if (!mailReg.test(control.value)) {
        return { status: 'error', message: '邮箱格式不正确' }
      }

      // 检查账户是否被注册过
      axios({
        method: 'post',
        url: this.url + 'register/email',
        data: {
          email: this.infoForm.controls['email'].value
        }
      }).then((response) =>{
        if(response.status == 200){
          this.emailY = true
        }
      }).catch((error) =>{
        if(error.status == 400){
          msg = "该邮箱已被注册"
        }else{
          msg = error.data
        }
        this.emailY = false
      })
    }else{
      this.emailY = true
    }

    if(this.emailY){
      return { status: 'success' }
    }else{
      return { status: 'error', message: msg }
    }
  }

  private passwordCheck = (control: FormControl): any => {
    if (!control.value) {
      return { status: 'error', message: '密码是必填项' }
    }
    this.passwordY = true
    return { status: 'success' }
  }

  private passwordConfirmCheck = (control: FormControl): any => {
    if (control.value != this.infoForm.controls['password'].value) {
      return { status: 'error', message: '两次密码不同' }
    }
    this.passwordConfirmY = true
    return { status: 'success' }
  }
}
