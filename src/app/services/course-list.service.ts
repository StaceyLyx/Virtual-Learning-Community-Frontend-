import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseListService {

  constructor(private http:HttpClient) { }
  public getCourse(){
    return this.http.get("/");
  }
}
