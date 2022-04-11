import {Component, forwardRef, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ElMessageService} from "element-angular";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  infoForm: FormGroup = new FormGroup({
    account: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    passwordConfirm: new FormControl('')
  })

  accountY: Boolean  = false
  emailY: Boolean  = false
  passwordY: Boolean  = false
  passwordConfirmY: Boolean  = false

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private message: ElMessageService) { }

  ngOnInit(): void {
    this.infoForm = this.formBuilder.group({
      account: ['', [this.accountCheck]],
      email: ['', [this.emailCheck]],
      password: ['', [this.passwordCheck]],
      passwordConfirm: ['', this.passwordConfirmCheck]
    })
  }

  submit(): void{
    if(this.accountY && this.emailY && this.passwordY
      && this.passwordConfirmY){
      this.message.setOptions({ showClose: true })
      this.message.success('注册成功，请登录')
      this.router.navigateByUrl("")
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

  private accountCheck = (control: FormControl): any => {
    if (!control.value) {
      return { status: 'error', message: '账户是必填项' }
    }
    this.accountY = true
    return { status: 'success' }
  }

  private emailCheck = (control: FormControl): any => {
    const mailReg: RegExp = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.]){1,2}[A-Za-z\d]{2,5}$/g
    if(control.value != ""){
      if (!mailReg.test(control.value)) {
        return { status: 'error', message: '邮箱格式不正确' }
      }
    }
    this.emailY = true
    return { status: 'success' }
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
