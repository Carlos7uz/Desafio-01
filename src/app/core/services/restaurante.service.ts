import { Injectable } from '@angular/core';
import { Restaurante } from '../models/restaurante.model';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RestauranteService {
  // RestaurantesUrl
  private restaurantesUrl = `${environment.baseUrl}/restaurantes`;

  private httpOptions = {
    header : new HttpHeaders({ 'Content-Type': 'applications/json'})
  }

  //Modulo Http
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

  //GET /restaurantes?name=term
  search(term: string): Observable<Restaurante[]> {
    if ( !term.trim() ) {
      return of([]);
    }

    return this.http.get<Restaurante[]>(`${this.restaurantesUrl}?name=${term}`)
      .pipe(
        tap((restaurante) =>
          restaurante.length
            ? console.log(`found ${restaurante.length} matching "${term}"`)
            : console.log(`No matching "${term}"`)
        )
      )
  }


  //Update  PUT /restaurantes/id
  updateRestaurante(restaurante: Restaurante): Observable<Restaurante> {
    return this.http.put<Restaurante>(`${this.restaurantesUrl}/${restaurante.id}`, restaurante).pipe(
      tap((restaurante) => console.log(`update restaurante ${restaurante.name}`))
    )

  }

  //Post /restaurantes
  createRestaurante(restaurante: Restaurante): Observable<Restaurante> {
    return this.http.post<Restaurante>(this.restaurantesUrl, restaurante).pipe(
      tap((restaurante) => console.log(`create restaurante ${restaurante.id} ${restaurante.name}`))
    )

  }

}
