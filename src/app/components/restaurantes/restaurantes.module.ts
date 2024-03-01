import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantesComponent } from './all_restaurants/restaurantes.component';
import { RestauranteDetailComponent } from './restaurante-detail/restaurante-detail.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RestaurantesRoutingModule } from './restaurant-routing.module';


@NgModule({
  declarations: [
    RestaurantesComponent,
    RestauranteDetailComponent,
  ],
  imports: [
    CommonModule,
    RestaurantesRoutingModule,
    MaterialModule,
    FlexLayoutModule,
  ]
})
export class RestaurantesModule { }
