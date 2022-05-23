import { Component, OnInit } from '@angular/core';
import { CourseListService } from 'src/app/course-list.service'
import { ActivatedRoute } from '@angular/router';
import {Router} from "@angular/router";
import axios from 'axios'
import {ElMessageService} from "element-angular";
import { CommunitySceneComponent } from '../community-scene/community-scene.component';
import { from } from 'rxjs';
@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  constructor(private service: CourseListService,private route:ActivatedRoute, private message: ElMessageService,private router:Router) {
  }
  courseList: Array<any> = []
  ngOnInit(): void {
    //http://localhost:8181/community
    //'https://www.fastmock.site/mock/aefaf6d191fd75512768a9b71ca2fea4/study/getCourse'
    //axios.get('https://www.fastmock.site/mock/aefaf6d191fd75512768a9b71ca2fea4/study/getCourse').then((res: { data: { data: any[]; }; }) => {
      //console.log(res)
      //this.courseList = res.data.data
    //})
    //console.log(this.route.snapshot.queryParams)
    this.getCourse();
  }



  getCourse() {
    axios.get('https://www.fastmock.site/mock/aefaf6d191fd75512768a9b71ca2fea4/study/getCourse', {

    }).then((res) =>{
      console.log(res)
      if(res.status == 200){
        this.courseList = res.data.data
        console.log(this.courseList)
      }else{
        console.log(res);
      }
    }).catch((error) =>{
      if(error.status == 400){
        this.message.setOptions({showClose: true});
        this.message.error("该课堂不存在");
        console.log(error);
      }else{
        console.log(error);
      }
    })
  }

  /* public showCourse(){
    let resp= this.service.getCourse();
    resp.subscribe((data)=>this.courseList=data);
   } */
}
