import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from '../models/users/users.model';

@Injectable({
  providedIn: 'root',
})
export class ContactosService {
  constructor(private http: HttpClient, public tokenService: TokenService) {}

  /**
   * Nombre: getAllUsers
   * Función: Obtener todas las chuches que tiene un usuario
   * @returns la url de la api
   */
  getAllUsers(userToken: string, SearchUser: string): Observable<Users[]> {
    //console.log(userToken, SearchUser);

    const body = {
      token: userToken,
      searchUser: SearchUser,
    };

    return this.http.post<Users[]>('http://127.0.0.1:8000/api/usuarios', body);
  }

  /**
   * Nombre: getAllChuchesUser
   * Función: Obtener todas las chuches que tiene un usuario
   * @returns la url de la api
   */
  getAllRequest(userToken: string): Observable<Users[]> {
    //console.log(userToken, SearchUser);

    return this.http.get<Users[]>(
      `http://127.0.0.1:8000/api/showSolicitudes/${userToken}`
    );
  }

  /**
   * Nombre: acceptar
   * Función: Obtener todas las chuches que tiene un usuario
   * @returns la url de la api
   */
  acceptar(userToken: string, SearchUser: string): Observable<Users[]> {
    //console.log(userToken, SearchUser);

    const body = {
      token: userToken,
      searchUser: SearchUser,
    };

    return this.http.post<Users[]>('http://127.0.0.1:8000/api/acceptar', body);
  }

  /**
   * Nombre: denegar
   * Función: Obtener todas las chuches que tiene un usuario
   * @returns la url de la api
   */
  denegar(userToken: string, SearchUser: string): Observable<Users[]> {
    //console.log(userToken, SearchUser);

    const body = {
      token: userToken,
      searchUser: SearchUser,
    };

    return this.http.post<Users[]>('http://127.0.0.1:8000/api/denegar', body);
  }

}
