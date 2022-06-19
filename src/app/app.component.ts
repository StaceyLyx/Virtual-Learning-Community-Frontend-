import {Component, OnInit} from '@angular/core';
import axios from "axios";

@Component({
  selector: 'app-root',     // 组件名称
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{   // 组件数据
  title = 'Virtual Community';

  ngOnInit(): void {
    // 修改前缀接口
    axios.defaults.baseURL = '/api/';

    // 请求拦截器
    axios.interceptors.request.use(
      conf => {

        // 增加token
        if (sessionStorage.getItem('token') && conf.headers) {
          conf.headers['Token'] = <string>sessionStorage.getItem("token");
        }
        console.log("request sent: ", conf);
        return conf;
      },
      error => {
        // 抛出请求错误信息
        Promise.reject(error.response)
      }
    )
  }

}
