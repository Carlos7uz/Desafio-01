import { Component, OnInit } from '@angular/core';
import { Restaurante } from 'src/app/restaurante.model';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.scss']
})
export class RestaurantesComponent implements OnInit {
  restaurante: Restaurante  = {
    id: 1,
    name: 'Madero - Shopping Estação',
    type: 'Steakhouse',
    endereco: 'Avenida Sete de Setembro, 2775, Rebouças, Curitiba-PR'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
