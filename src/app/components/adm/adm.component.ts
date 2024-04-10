import { Component, OnInit } from '@angular/core';
import { Restaurante } from 'src/app/core/models/restaurante.model';
import { RestauranteService } from 'src/app/core/services/restaurante.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservaService } from 'src/app/core/services/reserva.service';
import { Reserva } from 'src/app/core/models/reserva.model';

@Component({
  selector: 'app-adm',
  templateUrl: './adm.component.html',
  styleUrls: ['./adm.component.scss']
})
export class AdmComponent implements OnInit {
  restaurantes: Restaurante[] = [];
  reservas: Reserva[] =[];

  constructor(
    private restauranteService: RestauranteService,
    private reservasService: ReservaService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getRestaurantes();
    this.getReservas();
  }

  getRestaurantes(): void {
    this.restauranteService.getRestaurantes().subscribe(restaurantes =>
      this.restaurantes = restaurantes);
  }


  onSelected(restaurante: Restaurante): void {
    this.router.navigate(['/adm', restaurante.id]);
  }

  getReservas(): void {
    this.reservasService.getReserva().subscribe(reservas =>
      this.reservas = reservas)
  }

}
