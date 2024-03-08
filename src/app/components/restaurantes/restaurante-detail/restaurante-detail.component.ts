import { RestauranteService } from 'src/app/core/services/restaurante.service';
import { Component, Input, OnInit } from '@angular/core';
import { Restaurante } from 'src/app/core/models/restaurante.model';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurante-detail',
  templateUrl: './restaurante-detail.component.html',
  styleUrls: ['./restaurante-detail.component.scss']
})

export class RestauranteDetailComponent  implements OnInit {
  selectedRestaurante!: Restaurante;

  constructor(
    private restauranteService: RestauranteService,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
      this.getRestaurante();
  }

  getRestaurante(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.restauranteService.getRestaurante(id).subscribe(restaurante =>
      (this.selectedRestaurante = restaurante))
  }

  goBack():void{
    this.location.back();
  }

  save(): void{
    this.restauranteService.updateRestaurante(this.selectedRestaurante).subscribe(
      (restaurante) => console.log(restaurante));
      location.reload();
  }


  formValid(): boolean{
    return !!this.selectedRestaurante.name.trim()
  }}
