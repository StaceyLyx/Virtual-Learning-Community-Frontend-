import { Component, OnInit } from '@angular/core';
import { CourseListService } from 'src/app/course-list.service'
import { ActivatedRoute } from '@angular/router';
import axios from 'axios'
@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  constructor(private service: CourseListService,private route:ActivatedRoute) {


  }
  courseList: Array<any> = []
  ngOnInit(): void {
    //'https://www.fastmock.site/mock/aefaf6d191fd75512768a9b71ca2fea4/study/getCourse'
    axios.get('http://localhost:8181/communityclass').then(res => {
      console.log(res)
      this.courseList = res.data.data
    })
    console.log(this.route.snapshot.queryParams)
  }

  /* public showCourse(){
    let resp= this.service.getCourse();
    resp.subscribe((data)=>this.courseList=data);
   } */
}
