import { Component } from '@angular/core';
import { ChuchesService } from 'src/app/services/chuches.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent {
  chuchesService!: ChuchesService;
  tokenService!: TokenService;

  crearHorario(){
    const userToken = this.tokenService.getToken();
    this.chuchesService.horario(userToken!).subscribe({
      next: () => {
        console.log('Horario creado');
      },
      error: (error) => {
        alert('Horario fallido.');
        console.log(error);
      },
    });
  }

}
