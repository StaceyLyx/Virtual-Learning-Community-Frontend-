
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';    // 解析浏览器
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ElModule } from "element-angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClassComponent } from './components/class/class.component';
import { AssignTaskComponent } from './components/teacher/assign-task/assign-task.component';
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
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {CommunitySceneComponent} from "./components/community-scene/community-scene.component";
import {PersonalInfoComponent} from "./components/personal/personal-info/personal-info.component";
import {PersonalSideComponent} from "./components/personal/personal-side/personal-side.component";
import {PersonImageComponent} from "./components/personal/person-image/person-image.component";
import {PersonTaskComponent} from "./components/personal/person-task/person-task.component";
import {MenuComponent} from "./components/personal/menu/menu.component";
import {CheckComponent} from "./components/teacher/check/check.component";
import {FreeTaskComponent} from "./components/personal/free-task/free-task.component";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzImageModule} from "ng-zorro-antd/image";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {NzListModule} from "ng-zorro-antd/list";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzStepsModule} from "ng-zorro-antd/steps";
import {NzCascaderModule} from "ng-zorro-antd/cascader";
import {NzTimePickerModule} from "ng-zorro-antd/time-picker";
import {DatePipe, registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {NzProgressModule} from "ng-zorro-antd/progress";
import {NzResultModule} from "ng-zorro-antd/result";
import { GroupRoomComponent } from './components/group-room/group-room.component';
import {NzCommentModule} from "ng-zorro-antd/comment";
import {NzPopoverModule} from "ng-zorro-antd/popover";
import { CheckFinishedComponent } from './components/teacher/check-finished/check-finished.component';
import {CommunityWSService} from "./services/CommunityWS.service";
import {RoomWSService} from "./services/room-ws.service";
import { GenderTransformPipe } from './pipes/gender-transform.pipe';
import { GroupNameTransformPipe } from './pipes/group-name-transform.pipe';
import { StatusTransformPipe } from './pipes/status-transform.pipe';
import { NzCheckboxModule} from "ng-zorro-antd/checkbox";
import { PersonalFreeTaskComponent } from './components/personal/personal-free-task/personal-free-task.component';
registerLocaleData(zh);

@NgModule({
  declarations: [     // 自定义组件在此引入配置
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ClassComponent,
    AssignTaskComponent,
    TaskListComponent,
    CommunitySceneComponent,
    PersonalInfoComponent,
    MenuComponent,
    PersonalSideComponent,
    PersonImageComponent,
    PersonTaskComponent,
    CheckComponent,
    CheckFinishedComponent,
    FreeTaskComponent,
    UploadComponent,
    FooterComponent,
    TeamSizeTransformPipe,
    ValidityTransformPipe,
    OptionalTransformPipe,
    GroupRoomComponent,
    GenderTransformPipe,
    GroupNameTransformPipe,
    StatusTransformPipe,
    PersonalFreeTaskComponent,
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
    NzDividerModule,
    NzStepsModule,
    NzCascaderModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzInputNumberModule,
    NzProgressModule,
    NzResultModule,
    NzAvatarModule,
    NzCommentModule,
    NzPopoverModule,
    NzRadioModule,
    NzCheckboxModule,
  ],
  providers: [
    CommunityWSService,
    RoomWSService,
    DatePipe,
  ],      // 定义的服务
  bootstrap: [AppComponent]   // 默认启动加载的组件
})

export class AppModule { }  // 根模块
