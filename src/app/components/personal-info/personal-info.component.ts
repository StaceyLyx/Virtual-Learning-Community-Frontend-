import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import {ElMessageService} from "element-angular";
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
   Info:any
  constructor(private message: ElMessageService) { }

  ngOnInit(): void {
    this.getInfo()
  }

  getInfo() {
    //store的userId
   // http://localhost:8081/retrieveTasks/user
   //https://www.fastmock.site/mock/aefaf6d191fd75512768a9b71ca2fea4/study/getInfo
   //mock过接口
    axios.get('http://localhost:8081/retrieveTasks/user', {
      params: {
        userId: 0
      }
    }).then((res) =>{
      console.log(res)
      if(res.status == 200){
        this.Info = res.data.data
        console.log(this.Info)
      }else{
        console.log(res);
      }
    }).catch((error) =>{
      if(error.status == 400){
        this.message.setOptions({showClose: true});
        this.message.error("个人信息未查询到");
        console.log(error);
      }else{
        console.log(error);
      }
    })
  }
}
