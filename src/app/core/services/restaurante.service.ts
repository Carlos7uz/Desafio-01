import { Injectable } from '@angular/core';
import { RESTAURANTES } from './mock-restaurantes'
import { Restaurante } from '../models/restaurante.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  getRestaurantes(): Observable<Restaurante[]> {
    const restaurantes = of (RESTAURANTES)
    return restaurantes;
  }

  getRestaurante(id: number): Observable<Restaurante> {
    const restaurante = RESTAURANTES.find(restaurante => restaurante.id === id)!;

    return of(restaurante);
  }

  constructor() { }
}

