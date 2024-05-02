import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = `${environment.baseUrl}/users`;

  loggedIn = new BehaviorSubject<boolean>(false)
  isLoggedIn$ = this.loggedIn.asObservable();

  private isAdminSubject = new BehaviorSubject<boolean>(false);

  private userTypeSubject = new BehaviorSubject<number | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<User> {
    if (!email || !password) {
      throw new Error('Os campos e-mail e senha são obrigatórios.');
    }

    return this.http.get<User[]>(`${this.apiUrl}?email=${email}`).pipe(
      map(users => {
        if (users && users.length > 0){
          const user = users[0];
          if ( email === user.email && password === user.password) {
            const token = this.generateToken(user.id, user.type);
            localStorage.setItem('token', token);
            this.updateLoggedIn();
            return user;
          } else {
            this.updateLoggedIn();
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

  private generateToken(userId: number, userType: number): string {
    const randomString = Math.random().toString(36).substr(2, 6);
    const token = userId + '-' + randomString + '/' + userType;
    return btoa(token);
  }

  getToken(): string | null{
    const token = localStorage.getItem('token');
    if(token){
      return atob(token); // Descriptografar o token antes de retorná-lo
    }
    return null;
  }

  getUserIdFromToken(): number | null {
    const token = this.getToken();
    if (token) {
      const preUserId = token.split('-')[0];
      const userId = parseInt(preUserId, 10)
      console.log('Id extraido:', userId)
      return userId;
    }
    return null;
  }

  getUserTypeFromToken(): number | null {
    const token = this.getToken();
    if (token) {
      const preUserType = token.split('/')[1];
      const userType = parseInt(preUserType, 10);
      console.log('Type extraido:', userType);
      return userType;
    }
    return null;
  }

  logout(): void {
    // Remover o token de autenticação do armazenamento local
    this.setIsAdmin(false);
    localStorage.clear();
    this.updateLoggedIn();
    this.router.navigate(['/login'])
  }

  setIsAdmin(isAdmin: boolean): void {
    this.isAdminSubject.next(isAdmin);
    localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
  }

  getIsAdmin(): Observable<boolean> {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin) {
      this.isAdminSubject.next(JSON.parse(isAdmin));
    }
    return this.isAdminSubject.asObservable();
  }

  setUserType(userType: number): void {
    this.userTypeSubject.next(userType);
  }

  getUserType(): Observable<number | null> {
    return this.userTypeSubject.asObservable();
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      tap((user) => console.log(`fetched user id=${id} and name= ${user.name}`))
    );
    /*
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };

    if(token && headers){
    } else {
      return throwError('Não existe um token para autenticar sua chamada');
    }
    */
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      tap((profiles) => console.log(`fetched ${profiles.length} profiles`))
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user).pipe(
      tap((user) => console.log(`update restaurante ${user.name}`))
    )
  }

  updateLoggedIn():void{
    const token = localStorage.getItem('token');
    if(token){
      this.loggedIn.next(true)
    }else{
      this.loggedIn.next(false)
    }
  }
}
