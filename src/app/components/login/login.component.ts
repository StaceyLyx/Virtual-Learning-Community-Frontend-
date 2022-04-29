import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  infoForm: FormGroup = new FormGroup({
    account: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.infoForm = this.formBuilder.group({
      account: ['', [this.accountCheck]],
      password: ['', [this.passwordCheck]]
    })
  }

  submit(){
    this.router.navigateByUrl("scene")
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

  private accountCheck = (control: FormControl): any => {
    if (!control.value) {
      return { status: 'error', message: '账户是必填项' }
    }
    return { status: 'success' }
  }

  private passwordCheck = (control: FormControl): any => {
    if (!control.value) {
      return { status: 'error', message: '密码是必填项' }
    }
    return { status: 'success' }
  }

}
