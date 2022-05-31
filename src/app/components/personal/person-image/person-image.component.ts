import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ElMessageService } from 'element-angular';
@Component({
  selector: 'app-person-image',
  templateUrl: './person-image.component.html',
  styleUrls: ['./person-image.component.css']
})
export class PersonImageComponent implements OnInit {
src:string | undefined
  constructor(private message: ElMessageService) { }

  ngOnInit(): void {

  }
  //接口还未确定
  select1 () {
    axios.post('http://localhost:8081/', {
      params: {
      src: "assets/image/1.jpg"
      }
    }).then((response) =>{
      if(response.status == 200){
       console.log("修改成功")
      }else{
        console.log(response);
      }
    }).catch((error) =>{
      if(error.status == 400){
        this.message.setOptions({showClose: true});
        this.message.error("修改失败");
        console.log(error);
      }else{
        console.log(error);
      }
    })
}
  select2 () {

    axios.post('http://localhost:8081/', {
      params: {
      src: "assets/image/2.jpg"
      }
    }).then((response) =>{
      if(response.status == 200){
       console.log("修改成功")
      }else{
        console.log(response);
      }
    }).catch((error) =>{
      if(error.status == 400){
        this.message.setOptions({showClose: true});
        this.message.error("修改失败");
        console.log(error);
      }else{
        console.log(error);
      }
    })
}

select3 () {

  axios.post('http://localhost:8081/', {
    params: {
    src: "assets/image/3.jpg"
    }
  }).then((response) =>{
    if(response.status == 200){
     console.log("修改成功")
    }else{
      console.log(response);
    }
  }).catch((error) =>{
    if(error.status == 400){
      this.message.setOptions({showClose: true});
      this.message.error("修改失败");
      console.log(error);
    }else{
      console.log(error);
    }
  })
}
select4 () {

  axios.post('http://localhost:8081/', {
    params: {
    src: "assets/image/4.jpg"
    }
  }).then((response) =>{
    if(response.status == 200){
     console.log("修改成功")
    }else{
      console.log(response);
    }
  }).catch((error) =>{
    if(error.status == 400){
      this.message.setOptions({showClose: true});
      this.message.error("修改失败");
      console.log(error);
    }else{
      console.log(error);
    }
  })
}
}
