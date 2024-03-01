import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { FormsComponent } from './components/forms/forms.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';


const routes: Routes = [

  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'forms', component: FormsComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'restaurantes',
    loadChildren: () => import('./components/restaurantes/restaurantes.module').then
    ((module) => module.RestaurantesModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module').then
    ((module) => module.DashboardModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }

]


@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
