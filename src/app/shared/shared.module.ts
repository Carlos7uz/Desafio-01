import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestauranteSearchComponent } from './components/restaurante-search/restaurante-search.component';
import { MaterialModule } from '../material/material.module';

const COMPONENTS = [RestauranteSearchComponent];


@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [COMPONENTS],
})
export class SharedModule { }
