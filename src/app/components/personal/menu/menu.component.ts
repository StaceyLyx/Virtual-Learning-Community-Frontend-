import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router,
              private message: NzMessageService) { }

  ngOnInit(): void {}

  value: string = "";

  routerTo(path: string){
    if(path === "logout"){
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("token");
      path = '';
      this.message.info("登出成功");
    }
    this.router.navigateByUrl(path).then(r => {
      if (r) {
        console.log("navigate successfully")
      } else {
        console.log("local index")
      }
    })
  }
}
