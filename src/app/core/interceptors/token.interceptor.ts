import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService){}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
      const token = this.authService.getToken();
      if(token) {
        console.log('Token encontrado: ', token)
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }  else {
        // Tratamento de erro: token não encontrado ou inválido
        console.error('Token não encontrado ou inválido');
      }
      return next.handle(request);
    }
}
    /*
    if(this.authService.token){
      request = request.clone({
        setHeaders: {
          Authorization: this.authService.token
        }
      })
    }

    return next.handle(request);
  }

    if(!token) {
        token = this.generateToken();
        localStorage.setItem('token', token);

      } else {
        request = request.clone({
          setHeaders: {
            Authorization: token
          }
        })
      }
      return next.handle(request);
    }


  private generateToken(): string {
    return Math.random().toString(36).substring(2,12);
  }

}
*/
