import { Injectable } from '@angular/core';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor() { }
  tableData: any = []

  getTasksByClass(): any{

    return this.tableData
  }

  getTasksByUser(): any{
    axios.get('retrieveTasks/user', {
      params: {
        userId: sessionStorage.getItem('userId')
      }
    }).then((response) =>{
      if(response.status == 200){
        console.log("response: ", response)
        this.tableData = response.data.tableData
        for(let i = 0; i < response.data.result.length; ++i){
          this.tableData.push(response.data.result[i]);
        }
        console.log(this.tableData)
      }else{
        console.log(response);
      }
    }).catch((error) =>{
      console.log("error: ", error)
    })
    return this.tableData
  }
}
