import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { SceneComponent } from "./components/scene/scene.component";
import { CommunityComponent } from "./components/community/community.component";
import { AssignTaskComponent } from "./components/assign-task/assign-task.component"
import {TaskListComponent} from "./components/task-list/task-list.component";

import { CommunitySceneComponent } from './components/community-scene/community-scene.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { PersonImageComponent } from './components/person-image/person-image.component';
import { PersonTaskComponent } from './components/person-task/person-task.component';
import { CheckComponent } from './components/check/check.component';
import { FreeTaskComponent } from './components/free-task/free-task.component';
import {UploadComponent} from "./components/upload/upload.component";

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'scene', component: SceneComponent},
  { path: 'tasks', component: TaskListComponent},
  { path: 'tasks/upload/:taskId', component: UploadComponent},
  { path: 'community', component: CommunityComponent},
  { path: 'assignTask', component: AssignTaskComponent},
  { path: 'communityScene', component: CommunitySceneComponent},
  { path: 'personalInfo', component: PersonalInfoComponent},
  { path: 'personalInfo/Image', component: PersonImageComponent},
  { path: 'personalInfo/Task', component: PersonTaskComponent},
  { path: 'check', component: CheckComponent},
  { path: 'freeTask', component: FreeTaskComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
