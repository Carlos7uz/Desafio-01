import { Injectable } from '@angular/core';
import { RESTAURANTES } from './mock-restaurantes'
import { Restaurante } from '../models/restaurante.model';
import { Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {
  private restaurantesUrl = `${environment.baseUrl}/restaurantes`;

  constructor(private http: HttpClient) { }

  //GET /restaurantes
  getRestaurantes(): Observable<Restaurante[]> {
    return this.http.get<Restaurante[]>(this.restaurantesUrl).pipe(
      tap((restaurantes) => console.log(`fetched ${restaurantes.length} restaurantes`))
    );

  }


  //GET /restaurantes/id
  getRestaurante(id: number): Observable<Restaurante> {
    return this.http.get<Restaurante>(`${this.restaurantesUrl}/${id}`).pipe(
      tap((restaurante) => console.log(`fetched restaurante id=${id} and name= ${restaurante.name}`))
    )

  }

}

