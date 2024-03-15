import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      tap((users) => console.log(`fetched ${users.length} usuarios`)),
      catchError((error) => {
        console.error('Erro ao obter usuários', error);
        throw error;
      })
      );
    }

    register(user: User): Observable<User> {
      return this.http.post<User>(this.usersUrl, user).pipe(
        catchError((error) => {
          console.error('Erro ao registrar usuário', error);
          throw error;
        })
      );
    }

    checkEmailExists(email: string): Observable<boolean> {
      return this.getUsers().pipe(
        map(users => users.some(user => user.email === email))
      );
    }

    checkCellExists(cell: string): Observable<boolean> {
      return this.getUsers().pipe(
        map(users => users.some(user => user.cell === cell))
      );
    }
  }

