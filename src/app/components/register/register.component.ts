import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import axios from "axios";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  infoForm: FormGroup = new FormGroup({
    username: new FormControl(null),
    gender: new FormControl(null),
    password: new FormControl(null),
    passwordConfirm: new FormControl(null),
    email: new FormControl(null),
    phone: new FormControl(null),
  })

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private message: NzMessageService) { }

  ngOnInit(): void {
    this.infoForm = this.formBuilder.group({
      username: [null, [Validators.required, this.confirmUsername]],
      email: [null, [Validators.email, Validators.required]],
      gender: [null, [Validators.required]],
      password: [null, [Validators.required]],
      passwordConfirm: [null, [Validators.required, this.confirmPassword]],
      phone: [null, [Validators.required]]
    })
  }

  submit(): void{
    if(this.infoForm.valid) {
      console.log(this.infoForm);
        axios.post('register',{
          username: this.infoForm.controls['username'].value,
          email: this.infoForm.controls['email'].value,
          gender: this.infoForm.controls['gender'].value,
          password: this.infoForm.controls['password'].value,
          phone_num: this.infoForm.controls['phone'].value,
        }).then((response) =>{
          if(response.status === 200){   // 注册成功，默认跳转
            this.message.success('注册成功，请登录进入社区');
            this.router.navigateByUrl("").then(r => {
              if(r){
                console.log("navigate to login")
              }else{
                this.message.error('跳转失败')
                console.log("navigate failed")
              }
            })
          }
        }).catch((error) =>{
          console.log("error: " + error);
          if(error.response.status === 400){
            this.message.error("注册失败，密码长度需要有4-16位");
          }else{
            this.message.error("后端错误")
          }
        })
      }else{
        Object.values(this.infoForm.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.infoForm.controls['passwordConfirm'].updateValueAndValidity());
  }

  updateUsernameConform(): void{
    Promise.resolve().then(() => this.infoForm.controls['username'].updateValueAndValidity());
  }

  confirmPassword = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.infoForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  confirmUsername = (control: FormControl): { [s: string]: boolean } => {
    const formData = new FormData();
    formData.append('userName', control.value);

    axios.post('username', formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
    ).then(response => {
      console.log("response: ", response)
      return {};
    }).catch(error => {
      console.log("error: ", error.message)
      return { confirm: true, error: true };
    })
    return {};
  };
}
