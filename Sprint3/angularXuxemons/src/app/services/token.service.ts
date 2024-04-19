import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  static getToken() {
    throw new Error('Method not implemented.');
  }
  // static getToken: any;
  constructor() { }

  private readonly TOKEN_KEY = 'auth_token';
  private readonly Role_KEY = 'userRole';

  // Getters y Setters de la info del localStorage //
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY) || 'default';
  }
  getRole(): number | null {
    return parseInt(localStorage.getItem(this.Role_KEY) || '1');
  }
  setToken(token: any): void {
    localStorage.setItem(this.TOKEN_KEY, token.access_token);
    localStorage.setItem(this.Role_KEY, token.rol);
  }

  // Funciones para eliminar el token y el rol del localStorage //
  removeToken(): boolean {
    try {
      localStorage.removeItem(this.TOKEN_KEY);
      return true;
    } catch (error) {
      return false;
    }
  }
  removeRole(): boolean {
    try {
      localStorage.removeItem(this.Role_KEY);
      return true;
    } catch (error) {
      return false;
    }
  }
}
