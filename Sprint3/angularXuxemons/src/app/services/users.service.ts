import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from '../models/users/users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, public tokenService: TokenService) {}

  // Funciones de logear, registrarse y salir de la sesión //
  Login(user: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/login', user);
  }
  Registrar(user: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/register', user);
  }

  getUsuario(userToken: string): Observable<Users[]> {

    return this.http.get<Users[]>(`http://127.0.0.1:8000/api/usuario/${userToken}`);
  }

  saveImage(userToken:string, img: string): Observable<any> {
    
    const body = {
      token: userToken,
      imagen: img
    };
    
    return this.http.post('http://127.0.0.1:8000/api/subirImagen', img);
  }
}
