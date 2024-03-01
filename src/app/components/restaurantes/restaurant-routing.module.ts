import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestauranteDetailComponent } from './restaurante-detail/restaurante-detail.component';
import { RestaurantesComponent } from './all_restaurants/restaurantes.component';


const routes: Routes = [
  {path: '', component: RestaurantesComponent},
  {path: ':id', component: RestauranteDetailComponent},

]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantesRoutingModule { }
