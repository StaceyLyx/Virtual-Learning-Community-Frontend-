import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { SceneComponent } from "./components/scene/scene.component";
import { CommunityComponent } from "./components/community/community.component";
import { AssignTaskComponent } from "./components/assign-task/assign-task.component"

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'scene', component: SceneComponent},
  { path: 'community', component: CommunityComponent},
  { path: 'assignTask', component: AssignTaskComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
