import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurante } from 'src/app/core/models/restaurante.model';
import { RestauranteService } from 'src/app/core/services/restaurante.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  restaurantes: Restaurante[] = [];
  restaurantesHot: Restaurante[] = [];

  constructor(private restauranteService: RestauranteService, private router: Router) { }

  ngOnInit(): void {
    this.getRestaurante();
    this.getHotRestaurantes();
  }

  getRestaurante(){
    this.restauranteService.getRestaurantes().subscribe(restaurantes =>
      this.restaurantes = restaurantes.slice(0,3));
  }

  getHotRestaurantes(){
    this.restauranteService.getRestaurantes().subscribe(restaurantesHot =>
      this.restaurantesHot = restaurantesHot.slice(3,6))
  }

  onSelected(restaurante: Restaurante): void{
    this.router.navigate(['/restaurantes', restaurante.id]);
  }

}
