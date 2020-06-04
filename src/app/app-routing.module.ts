import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component'
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path:'', component: LoginComponent
  },
  {
    path: 'main', 
    canActivate:[AuthGuard],
    loadChildren: () => import('./app-main/app-main.module').then(x=>x.AppMainModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
