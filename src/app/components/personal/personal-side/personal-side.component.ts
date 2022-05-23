import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-personal-side',
  templateUrl: './personal-side.component.html',
  styleUrls: ['./personal-side.component.css']
})
export class PersonalSideComponent implements OnInit {

  constructor(private router: Router,
              private message: NzMessageService) { }

  ngOnInit(): void {}

  routerTo(path: string){
    this.router.navigateByUrl(path).then(r => {
      if (r) {
        console.log("navigate successfully")
      } else {
        console.log("local index")
      }
    })
  }

}
