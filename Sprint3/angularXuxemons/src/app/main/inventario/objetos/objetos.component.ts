import { Component, OnInit } from '@angular/core';
// Imports extras //
import { TokenService } from '../../../services/token.service';
import { ChuchesService } from '../../../services/chuches.service';
import { ChuchesUser } from '../../../models/chuches/chuchesUser.model';
import { Curas } from '../../../models/curas/curas.model';
import { Horario } from '../../../models/horario/horario.model';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-objetos',
  templateUrl: './objetos.component.html',
  styleUrls: ['./objetos.component.css'],
})
export class ObjetosComponent implements OnInit {
  chucheUser: ChuchesUser[] = [];
  Curas: Curas[] = [];
  horario: Horario[] = [];
  userRol!: number;

  constructor(
    private tokenService: TokenService,
    private chuchesService: ChuchesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userRol = this.tokenService.getRole()!;
    this.getChuches();
    this.getCuras();
  }

  /**
   * Nombre: getChuches
   * Función: obtiene todas las chuches que son del usuario que esta en sessión
   */
  getChuches() {
    const userToken = this.tokenService.getToken();
    console.log('userToken getChuches: ' + userToken);

    if (userToken !== null) {
      this.chuchesService.getAllChuchesUser(userToken).subscribe({
        next: (chuchesUser: any) => {
          this.chucheUser = chuchesUser[0];
        },
        error: (error) => {
          console.error('Error fetching Xuxemons:', error);
        },
      });
    } else {
      console.error('User ID is null');
    }
  }

  /**
   * Nombre: getChuches
   * Función: obtiene todas las chuches que son del usuario que esta en sessión
   */
  getCuras() {
    const userToken = this.tokenService.getToken();
    console.log('userToken getChuches: ' + userToken);

    if (userToken !== null) {
      this.chuchesService.getAllCuras().subscribe({
        next: (curas: any) => {
          this.Curas = curas[0];
        },
        error: (error) => {
          console.error('Error fetching Xuxemons:', error);
        },
      });
    } else {
      console.error('User ID is null');
    }
  }

  /**
   * Nombre: alimentar
   * Función: Envia al usuario a a ruta para alimentar al Xuxemon, a su vez esta enviando los datos del xuxuemon
   */
  curar(xuxeUser: any) {
    console.log('Datos de xuxeUser:', xuxeUser);
    const navigationExtras: NavigationExtras = {
      queryParams: {
        id: xuxeUser.xuxemon_id,
        nombre: xuxeUser.nombre,
        archivo: xuxeUser.archivo,
        tamano: xuxeUser.tamano,
      },
    };
    this.router.navigate(
      ['/objetos/curar'],
      navigationExtras
    );
  }

}
