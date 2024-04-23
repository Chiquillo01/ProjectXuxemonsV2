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
  getAllEnfermosUser(userToken: string, enfermedad: number): Observable<EnfermedadesUser[]> {
    // const body = {
    //   token: userToken
    // };
    return this.http.get<EnfermedadesUser[]>(
      `http://127.0.0.1:8000/api/enfermos/${userToken}/${enfermedad}`
    );
  }

  /**
 * Nombre: xuxemonFav
 * Función: 
 * @returns Un observable que emite la respuesta de la solicitud HTTP.
 */
  curarEnf(userToken: string, xuxemon_id: number, enfId: number): Observable<any> {
    const body = {
      userToken: userToken,
      xuxemon_id: xuxemon_id,
      enfId: enfId
    };

    return this.http.post<any>(
      'http://127.0.0.1:8000/api/curar', body
    );
  }

}
