import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import {ElMessageService} from "element-angular";
import {NzMessageService} from "ng-zorro-antd/message";
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  constructor(private message: NzMessageService) { }

  info: any = {
    username: "廖妍昕",
    email: "outlook.com",
    phone_num: 123,
    ev: 1,
    register_date:"2021-1-2",
  }

  ngOnInit(): void {
    // axios.get('retrieveTasks/user', {
    //   params: {
    //     userId: 0
    //   }
    // }).then((res) =>{
    //   console.log(res)
    //   if(res.status == 200){
    //     this.Info = res.data.data
    //     console.log(this.Info)
    //   }else{
    //     console.log(res);
    //   }
    // }).catch((error) =>{
    //   if(error.status == 400){
    //     this.message.setOptions({showClose: true});
    //     this.message.error("个人信息未查询到");
    //     console.log(error);
    //   }else{
    //     console.log(error);
    //   }
    // })
  }

}
