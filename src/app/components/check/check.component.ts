import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ElMessageService } from 'element-angular';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  constructor(private message: ElMessageService) { }

expandSet = new Set<number>();
tableDataGroup: any = []
tableDataPerson: any = []


  ngOnInit(): void {
    this.getTaskGroup();
    this.getTaskPerson();
  }
  getTaskGroup() {
    //store的USERID AUTHORITYID
   //http://localhost:8081/admin/retrieveTasks/unfinishedGroup
    axios.get('http://localhost:8081/admin/retrieveTasks/unfinishedGroup', {
      params: {
        userId: 0,
        
      }
    }).then((response) =>{
      if(response.status == 200){
        console.log(response)
        this.tableDataGroup = response.data.tableData
        console.log(this.tableDataGroup)
        for(let i = 0; i < response.data.result.length; ++i){
          this.tableDataGroup.push(response.data.result[i]);
        }
       
      }else{
        console.log(response);
      }
    }).catch((error) =>{
      if(error.status == 400){
        this.message.setOptions({showClose: true});
        this.message.error("无任务");
        console.log(error);
      }else{
        console.log(error);
      }
    })
  }
  getTaskPerson() {
    //store的USERID AUTHORITYID
   //http://localhost:8081/admin/retrieveTasks/unfinishedGroup
    axios.get('http://localhost:8081/admin/retrieveTasks/unfinishedPersonal', {
      params: {
        userId: 0,
        
      }
    }).then((response) =>{
      if(response.status == 200){
        console.log(response)
        this.tableDataPerson = response.data.tableData
        console.log(this.tableDataPerson)
        for(let i = 0; i < response.data.result.length; ++i){
          this.tableDataPerson.push(response.data.result[i]);
        }
       
      }else{
        console.log(response);
      }
    }).catch((error) =>{
      if(error.status == 400){
        this.message.setOptions({showClose: true});
        this.message.error("无任务");
        console.log(error);
      }else{
        console.log(error);
      }
    })
  }
  passGroup(id:any,name:string){
    //delete 
    this.tableDataGroup = this.tableDataGroup.filter((d: { id: any; }) => d.id !== id);
    console.log(id)
    axios.post('http://localhost:8081/admin/checkCompletion/groupTask', {
      params: {
        taskId:id,
        userId:0,
        //groupId:0
      }
    }).then((response) =>{
      if(response.status == 200){
       console.log("审核完成")
      }else{
        console.log(response);
      }
    }).catch((error) =>{
      if(error.status == 400){
        this.message.setOptions({showClose: true});
        this.message.error("审核通过失败");
        console.log(error);
      }else{
        console.log(error);
      }
    })
  }
  passPerson(id:any,name:string){
    //delete 
    this.tableDataGroup = this.tableDataGroup.filter((d: { id: any; }) => d.id !== id);
    console.log(id)
    axios.post('http://localhost:8081/admin/checkCompletion/personTask', {
      params: {
        taskId:0,
        userId:0,
      }
    }).then((response) =>{
      if(response.status == 200){
       console.log("审核完成")
      }else{
        console.log(response);
      }
    }).catch((error) =>{
      if(error.status == 400){
        this.message.setOptions({showClose: true});
        this.message.error("审核通过失败");
        console.log(error);
      }else{
        console.log(error);
      }
    })
  }

}