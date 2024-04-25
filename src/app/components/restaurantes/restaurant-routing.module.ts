import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestauranteDetailComponent } from './restaurante-detail/restaurante-detail.component';
import { RestaurantesComponent } from './all_restaurants/restaurantes.component';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';

const routes: Routes = [
  {path: '', component: RestaurantesComponent, canActivate: [AuthGuard]},
  {path: ':id', component: RestauranteDetailComponent, canActivate: [AuthGuard]},
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RestaurantesRoutingModule { }
