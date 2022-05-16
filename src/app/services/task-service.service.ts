import { Injectable } from '@angular/core';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor() { }

  tableData: any = [{
    id: 1,
    name: "高级web",
    type: 1,
    teamSize: 5,
    ddl: "2021-02-01",
    ev: 1,
    publisher: 1,
    description: "A组",
    validity: 0,
  },{
    id: 2,
    name: "高级web",
    type: 1,
    teamSize: 1,
    ddl: "2021-02-01",
    ev: 1,
    publisher: 1,
    description: "A组",
    validity: 1,
  },{
    id: 3,
    name: "高级web",
    type: 1,
    teamSize: 100,
    ddl: "2021-02-01",
    ev: 1,
    publisher: 1,
    description: "A组",
    validity: 2,
  }]

  getTasks(): any{
    // axios.get('api/retrieveTasks/class', {
    //   params: {
    //     classId: 1
    //   }
    // }).then((response) =>{
    //   if(response.status == 200){
    //     for(let i = 0; i < response.data.result.length; ++i){
    //       this.tableData.push(response.data.result[i]);
    //     }
    //     console.log(this.tableData)
    //   }else{
    //     console.log(response);
    //   }
    // }).catch((error) =>{
    //   console.log("error: ", error)
    // })
    return this.tableData
  }
}
