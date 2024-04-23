import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnfermedadesUser } from '../models/enfermedadesUser/enfermedadesUser.model';

@Injectable({
  providedIn: 'root'
})
export class CurarService {
  constructor(private http: HttpClient, public tokenService: TokenService) {}

  /**
   * Nombre: getAllChuchesUser
   * Función: Obtener todas las chuches que tiene un usuario
   * @returns la url de la api
   */
  getAllEnfermosUser(userToken: string): Observable<EnfermedadesUser[]> {
    // const body = {
    //   token: userToken
    // };
    return this.http.get<EnfermedadesUser[]>(
      `http://127.0.0.1:8000/api/enfermos/${userToken}`
    );
  }
}
