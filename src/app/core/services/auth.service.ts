import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'aplication/json' })
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl =  `${environment.baseUrl}/users`;
  loggedIn = new BehaviorSubject<boolean>(false)

  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<User> {
    if (!email || !password) {
      throw new Error('Os campos e-mail e senha são obrigatórios.');
    }
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}`).pipe(
      map(users => {
        if (users && users.length > 0){
          const user = users[0];
          if (password === user.password) {
            const token = this.generateToken(user.id);
            localStorage.setItem('token', token);
            this.loggedIn.next(true);
            return user;
          } else {
            throw new Error('Credenciais inválidas. Verifique seu email e senha.')
          };

        } else {
          throw new Error('Usuário não encontrado.')
        }
      }),
      catchError(error => {
        return throwError('Ocorreu um erro ao efetuar o login. Por favor, tente novamente.')
      })
    );
  }

  private generateToken(userId: string): string {
    // Implementação de uma função de hash simples para gerar o token
    const token = btoa(userId); // Aqui você pode usar uma função de hash mais segura
    return token;
  }

  getToken(): string | null{
    return localStorage.getItem('token');
  }

  logout(): void {
    // Remover o token de autenticação do armazenamento local
    localStorage.removeItem('token');
    this.loggedIn.next(false)
    this.router.navigate(['/login'])
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}




