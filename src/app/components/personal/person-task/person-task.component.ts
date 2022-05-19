import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import {ElMessageService} from "element-angular";
import {TaskServiceService} from "../../../services/task-service.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-person-task',
  templateUrl: './person-task.component.html',
  styleUrls: ['./person-task.component.css']
})
export class PersonTaskComponent implements OnInit {

  constructor(private message: NzMessageService,
              private taskService: TaskServiceService) { }

  tableData: any = []

  ngOnInit(): void {
    this.tableData = this.taskService.getTasksByUser();
  }

}
