import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Restaurante } from 'src/app/core/models/restaurante.model';
import { RestauranteService } from 'src/app/core/services/restaurante.service';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-restaurante-detail',
  templateUrl: './restaurante-detail.component.html',
  styleUrls: ['./restaurante-detail.component.scss']
})

export class RestauranteDetailComponent  implements OnInit {
  @Input() isLoggedIn: boolean | null = null;

  selectedRestaurante!: Restaurante;
  isEditing!: boolean;
  map?: mapboxgl.Map;

  constructor(
    private restauranteService: RestauranteService,
    private location: Location,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
      this.getRestaurante();
      this.initializeMap();
  }

  getRestaurante(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.restauranteService.getRestaurante(id).subscribe(restaurante =>
      (this.selectedRestaurante = restaurante))
  }


  goBack():void{
    this.location.back();
  }

  private initializeMap(): void {
    const accessToken = environment.mapboxKey;

    this.map = new mapboxgl.Map({
      container: 'mapa-mapbox',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ -49.26673517437175, -25.438318956976637], //lng, lat
      zoom: 18,
      accessToken: accessToken
    });
    console.log('mapa funcionado')
  }

}


