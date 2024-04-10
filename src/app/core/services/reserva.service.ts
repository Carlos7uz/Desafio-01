import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reserva } from '../models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = `${environment.baseUrl}/reservas`

  constructor(private http: HttpClient) { }

  enviarReserva(reservaData: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.apiUrl, reservaData).pipe(
      tap((reserva) => console.log(`Post ${reserva.id} ${reserva.place} reserva for db`)),
      tap((reserva) => this.getReserva()))
  }

  getReserva(): Observable<Reserva[]>{
    return this.http.get<Reserva[]>(this.apiUrl).pipe(
      tap((reservas) => console.log(`fetched ${reservas.length} reservas`))
    );
  };
}
