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
    axios.defaults.baseURL = 'http://localhost:8081/api/'

    // 请求拦截器
    axios.interceptors.request.use(
      conf => {

        // 增加token
        // if (sessionStorage.getItem('auth']) {
        //   conf.headers['Authorize'] = sessionStorage.getItem('auth')
        // }
        console.log("request sent: ", conf)
        return conf
      },
      error => {
        // 抛出请求错误信息
        Promise.reject(error.response)
      }
    )
  }

}
