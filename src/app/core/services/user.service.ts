import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'api/users'

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.usersUrl).pipe(
      tap((users) => console.log(`fetched ${users.length} restaurantes`))
    )
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user);
  }

}
