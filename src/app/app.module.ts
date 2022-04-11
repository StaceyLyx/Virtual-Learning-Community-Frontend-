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


@NgModule({
  declarations: [     // 自定义组件在此引入配置
    AppComponent,
    TopBarComponent,
    LoginComponent,
    RegisterComponent,
    SceneComponent
  ],
  imports: [          // 项目依赖模块
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ElModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],      // 定义的服务
  bootstrap: [AppComponent]   // 默认启动加载的组件
})

export class AppModule { }  // 根模块
