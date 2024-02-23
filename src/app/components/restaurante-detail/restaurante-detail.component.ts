import { Component, Input } from '@angular/core';
import { Restaurante } from 'src/app/restaurante.model';

@Component({
  selector: 'app-restaurante-detail',
  templateUrl: './restaurante-detail.component.html',
  styleUrls: ['./restaurante-detail.component.scss']
})
export class RestauranteDetailComponent   {

  @Input() selectedRestaurante?: Restaurante

  constructor() { }



}
