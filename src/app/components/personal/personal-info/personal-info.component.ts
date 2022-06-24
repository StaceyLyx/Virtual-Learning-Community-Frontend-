import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  constructor(private message: NzMessageService) { }

  info: any;

  status?: string;

  ngOnInit(): void {
    axios.get('retrieveUserInfo', {
      params: {
        userId: parseInt(<string>sessionStorage.getItem("userId")),
      }
    }).then((res) =>{
      console.log(res)
      if(res.status === 200){
        this.info = res.data
        console.log(this.info)
      }else{
        console.log(res);
      }
    }).catch((error) =>{
      if(error.response.status === 400){
        this.message.error("未查询到个人信息");
        console.log(error);
      }else{
        console.log(error);
      }
    })
  }

  statusConfirm(){
    if(this.status){
      const formData = new FormData();
      formData.append('userId', <string>sessionStorage.getItem("userId"));
      formData.append('status', this.status);

      axios.post('changeStatus', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      ).then(response => {
        console.log("response: ", response)
        if (response.status === 200) {
          this.message.success("设置成功");
        }
      }).catch(error => {
        console.log(error.response);
        if(error.response.status === 400){
          this.message.error("设置失败");
        }
      })
    }else{
      this.message.error("请填写你的状态信息");
    }
  }

}
