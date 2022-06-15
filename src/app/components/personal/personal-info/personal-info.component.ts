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

  info: any;

  ngOnInit(): void {
    axios.get('retrieveUserInfo', {
      params: {
        userId: parseInt(<string>sessionStorage.getItem("userId")),
      }
    }).then((res) =>{
      console.log(res)
      if(res.status == 200){
        this.info = res.data
        console.log(this.info)
      }else{
        console.log(res);
      }
    }).catch((error) =>{
      if(error.status == 400){
        this.message.error("未查询到个人信息");
        console.log(error);
      }else{
        console.log(error);
      }
    })
  }

}
