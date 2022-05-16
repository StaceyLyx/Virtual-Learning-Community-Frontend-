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
import { CommunitySceneComponent } from './components/community-scene/community-scene.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzIconModule} from "ng-zorro-antd/icon";

import { NzListModule } from 'ng-zorro-antd/list';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { MenuComponent } from './components/menu/menu.component';
import { PersonalSideComponent } from './components/personal-side/personal-side.component';
import { PersonImageComponent } from './components/person-image/person-image.component';
import { PersonTaskComponent } from './components/person-task/person-task.component';
import { CheckComponent } from './components/check/check.component';
import zh from '@angular/common/locales/zh';
import {registerLocaleData} from '@angular/common';
import { FreeTaskComponent } from './components/free-task/free-task.component';
registerLocaleData(zh);

import { TeamSizeTransformPipe } from './pipes/team-size-transform.pipe';
import { ValidityTransformPipe } from './pipes/validity-transform.pipe';
import { OptionalTransformPipe } from './pipes/optional-transform.pipe';
import {UploadComponent} from "./components/upload/upload.component";
import {NzMessageModule} from "ng-zorro-antd/message";
import {NzNotificationModule} from "ng-zorro-antd/notification";
import {FooterComponent} from "./components/footer/footer.component";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzUploadModule} from "ng-zorro-antd/upload";
import {NzCollapseModule} from "ng-zorro-antd/collapse";


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
    CommunitySceneComponent,
    PersonalInfoComponent,
    MenuComponent,
    PersonalSideComponent,
    PersonImageComponent,
    PersonTaskComponent,
    CheckComponent,
    FreeTaskComponent,
    UploadComponent,
    FooterComponent,
    TeamSizeTransformPipe,
    ValidityTransformPipe,
    OptionalTransformPipe,
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
    NzIconModule,
    NzListModule,
    NzInputNumberModule,
    NzRadioModule,
    NzTabsModule,
    NzMenuModule,
    NzDescriptionsModule,
    NzImageModule,
    NzCardModule,
    NzAvatarModule,
    NzDatePickerModule,
    NzSelectModule,
    NzMessageModule,
    NzNotificationModule,
    NzModalModule,
    NzUploadModule,
    NzCollapseModule,
    NzDescriptionsModule,
    NzMenuModule,
    NzTableModule,
  ],
  providers: [],      // 定义的服务
  bootstrap: [AppComponent]   // 默认启动加载的组件
})

export class AppModule { }  // 根模块
