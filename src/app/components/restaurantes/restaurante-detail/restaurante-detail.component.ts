import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Restaurante } from 'src/app/core/models/restaurante.model';
import { RestauranteService } from 'src/app/core/services/restaurante.service';

@Component({
  selector: 'app-restaurante-detail',
  templateUrl: './restaurante-detail.component.html',
  styleUrls: ['./restaurante-detail.component.scss']
})

export class RestauranteDetailComponent  implements OnInit {
  selectedRestaurante!: Restaurante;
  isEditing!: boolean;


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

  isFormValid(): boolean {
    const selectedRestaurante = this.selectedRestaurante;
    return !(
      selectedRestaurante.name.trim() &&
      selectedRestaurante.type.trim() &&
      selectedRestaurante.endereco.trim() &&
      selectedRestaurante.horario.trim()
    );
  }

  save(): void{

  }

  formValid(): boolean{
    return !!this.selectedRestaurante.name.trim()
  }

}


