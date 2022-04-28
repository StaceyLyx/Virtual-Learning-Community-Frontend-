import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {CommunityComponent} from "./components/community/community.component";
import { HttpClientModule } from '@angular/common/http';
import {AssignTaskComponent} from "./components/assign-task/assign-task.component"
const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'community', component: CommunityComponent},
  { path: 'assignTask', component: AssignTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
