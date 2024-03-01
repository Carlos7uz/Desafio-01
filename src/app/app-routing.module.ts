import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { FormsComponent } from './components/forms/forms.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [

  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'forms', component: FormsComponent},
  {path: 'login', component: LoginComponent},

]


@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
