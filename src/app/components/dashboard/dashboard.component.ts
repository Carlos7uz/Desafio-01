import { Component, OnInit } from '@angular/core';
import { Restaurante } from 'src/app/core/models/restaurante.model';
import { RestauranteService } from 'src/app/core/services/restaurante.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  restaurantes: Restaurante[] = [];

  constructor(private restauranteService: RestauranteService) { }

  ngOnInit(): void {
    this.getRestaurante();
  }

  getRestaurante(){
    this.restauranteService.getRestaurantes().subscribe(restaurantes =>
      this.restaurantes = restaurantes.slice(0,3));
  }

}
