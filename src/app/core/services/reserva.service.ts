import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reserva } from '../models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = `${environment.baseUrl}/forms`

  constructor(private http: HttpClient) { }

  enviarReserva(reservaData: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.apiUrl, reservaData).pipe(
      tap((restaurantes) => console.log(`Post ${restaurantes.id} ${restaurantes.place} restaurantes for db`)))
  }

}
