import { Injectable } from '@angular/core';
import { RESTAURANTES } from '././mock-restaurantes'
import { Restaurante } from './restaurante.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  getRestaurantes(): Observable<Restaurante[]> {
    const restaurantes = of (RESTAURANTES)
    return restaurantes;
  }

  constructor() { }
}
