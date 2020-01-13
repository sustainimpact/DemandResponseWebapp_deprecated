import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component'


const routes: Routes = [
  // {
  //   path:'', component: LoginComponent
  // },
  {
    path: '', 
    loadChildren: () => import('./app-main/app-main.module').then(x=>x.AppMainModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
