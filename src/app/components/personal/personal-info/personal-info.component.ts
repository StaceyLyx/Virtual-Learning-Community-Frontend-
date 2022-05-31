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
