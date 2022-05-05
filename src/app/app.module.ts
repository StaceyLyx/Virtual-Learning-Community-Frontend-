// 组装应用文件

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';    // 解析浏览器
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ElModule } from "element-angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SceneComponent } from './components/scene/scene.component';
import { CommunityComponent } from './components/community/community.component';
import { AssignTaskComponent } from './components/assign-task/assign-task.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskListComponent } from './components/task-list/task-list.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzIconModule} from "ng-zorro-antd/icon";

@NgModule({
  declarations: [     // 自定义组件在此引入配置
    AppComponent,
    TopBarComponent,
    LoginComponent,
    RegisterComponent,
    SceneComponent,
    CommunityComponent,
    AssignTaskComponent,
    TaskListComponent,
  ],
  imports: [          // 项目依赖模块
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ElModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzDividerModule,
    NzIconModule
  ],
  providers: [],      // 定义的服务
  bootstrap: [AppComponent]   // 默认启动加载的组件
})

export class AppModule { }  // 根模块
