import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-personal-side',
  templateUrl: './personal-side.component.html',
  styleUrls: ['./personal-side.component.css']
})
export class PersonalSideComponent implements OnInit {

  constructor(private router: Router) { }

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
