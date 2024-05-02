import { AuthService } from 'src/app/core/services/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reserva } from '../models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = `${environment.baseUrl}/reservas`

  constructor(private http: HttpClient, private authService: AuthService) { }

  enviarReserva(reservaData: Reserva): Observable<Reserva> {
    const userId = this.authService.getUserIdFromToken();
    if(userId === null || userId === undefined) {
      throw new Error('User Id not found');
    }
    reservaData.userId = userId;
    return this.http.post<Reserva>(this.apiUrl, reservaData).pipe(
      tap((reserva) => console.log(`Post ${reserva.id} ${reserva.place} reserva for db`)),
      tap((reserva) => this.getReserva())
    );
  }


  getReserva(): Observable<Reserva[]>{
    const userId = this.authService.getUserIdFromToken();
    if (userId === null || userId === undefined) {
      throw new Error('User Id not found');
    }
    return this.http.get<Reserva[]>(`${this.apiUrl}?userId=${userId}`).pipe(
      tap((reservas) => console.log(`fetched ${reservas.length} reservas for user ${userId}`))
    );
  };

  getReservasByUser(): Observable<Reserva[]> {
    const userId = this.authService.getUserIdFromToken();
    if (!userId) {
      throw new Error('User Id not found');
    }

    return this.http.get<Reserva[]>(this.apiUrl).pipe(
      map(reservas => reservas.filter(reserva => reserva.userId === userId)),
      tap(filteredReservas => console.log(`Fetched ${filteredReservas.length} reservas for user ${userId}`))
    );
  }

}
