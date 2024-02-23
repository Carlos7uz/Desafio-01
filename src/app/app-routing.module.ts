import { NgModule } from '@angular/core';
import { RestaurantesComponent } from './components/restaurantes/restaurantes.component';
import { RouterModule, Routes } from '@angular/router';

import { RestauranteDetailComponent } from './components/restaurante-detail/restaurante-detail.component';
import { FormsComponent } from './components/forms/forms.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';



const routes: Routes = [

  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'restaurantes', component: RestaurantesComponent},
  {path: 'restaurantedetail', component: RestauranteDetailComponent},
  {path: 'restaurantedetail/:id', component: RestauranteDetailComponent},
  {path: 'forms', component: FormsComponent},
  {path: 'login', component: LoginComponent},
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
