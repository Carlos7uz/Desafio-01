import { Component, OnInit } from '@angular/core';
import { Restaurante } from 'src/app/restaurante.model';
import { RestauranteService } from 'src/app/restaurante.service';


@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.scss']
})
export class RestaurantesComponent implements OnInit {

  restaurantes: Restaurante[] = [];

  selectedRestaurante?: Restaurante;

  constructor(private restauranteService: RestauranteService) {}


  ngOnInit(): void {
    this.getRestaurantes();
  }

  getRestaurantes(): void {
    this.restauranteService.getRestaurantes().subscribe(restaurantes =>
      this.restaurantes = restaurantes);
  }

  onSelect(restaurante: Restaurante): void{
    this.selectedRestaurante = restaurante;
  }
}
