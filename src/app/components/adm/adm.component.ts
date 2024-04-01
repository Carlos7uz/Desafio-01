import { Component, OnInit } from '@angular/core';
import { Restaurante } from 'src/app/core/models/restaurante.model';
import { RestauranteService } from 'src/app/core/services/restaurante.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-adm',
  templateUrl: './adm.component.html',
  styleUrls: ['./adm.component.scss']
})
export class AdmComponent implements OnInit {
  restaurantes: Restaurante[] = [];

  constructor(
    private restauranteService: RestauranteService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getRestaurantes()
  }

  getRestaurantes(): void {
    this.restauranteService.getRestaurantes().subscribe(restaurantes =>
      this.restaurantes = restaurantes);
  }


  onSelected(restaurante: Restaurante): void {
    this.router.navigate(['/adm', restaurante.id]);
  }

}
