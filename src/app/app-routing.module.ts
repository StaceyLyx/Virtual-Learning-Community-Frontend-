import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ClassComponent } from "./components/class/class.component";
import { CommunityComponent } from "./components/community/community.component";
import { AssignTaskComponent } from "./components/assign-task/assign-task.component";
import { TaskListComponent} from "./components/task-list/task-list.component";
import { UploadComponent} from "./components/upload/upload.component";
import { CommunitySceneComponent} from "./components/community-scene/community-scene.component";
import { PersonImageComponent } from './components/personal/person-image/person-image.component';
import { PersonalInfoComponent } from './components/personal/personal-info/personal-info.component';
import { CheckComponent } from './components/check/check.component';
import { PersonTaskComponent } from './components/personal/person-task/person-task.component';
import { FreeTaskComponent } from './components/personal/free-task/free-task.component';
import { GroupRoomComponent } from './components/group-room/group-room.component';

const routes: Routes = [
  // 登陆注册
  { path: '', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  // 社区
  { path: 'community', component: CommunityComponent},
  { path: 'assignTask', component: AssignTaskComponent},
  { path: 'communityScene', component: CommunitySceneComponent},
  // 虚拟课堂
  { path: 'class', component: ClassComponent},
  { path: 'class/tasks', component: TaskListComponent},
  // 个人资料
  { path: 'personalInfo', component: PersonalInfoComponent},
  { path: 'personalInfo/Image', component: PersonImageComponent},
  { path: 'personalInfo/Task', component: PersonTaskComponent},
  { path: 'personalInfo/freeTask', component: FreeTaskComponent},
  // 完成任务
  { path: 'tasks/upload', component: UploadComponent},
  { path: 'tasks/group', component: GroupRoomComponent},

  { path: 'check', component: CheckComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
