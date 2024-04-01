import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurante } from 'src/app/core/models/restaurante.model';
import { RestauranteService } from 'src/app/core/services/restaurante.service';


@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.scss']
})
export class RestaurantesComponent implements OnInit {

  restaurantes: Restaurante[] = [];



  constructor(private restauranteService: RestauranteService, private router: Router) {}


  ngOnInit(): void {
    this.getRestaurantes();
  }

  getRestaurantes(): void {
    this.restauranteService.getRestaurantes().subscribe(restaurantes =>
      this.restaurantes = restaurantes);
  }

  onSelected(restaurante: Restaurante): void{
    this.router.navigate(['/restaurantes', restaurante.id]);
  }

}
