import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { XuxemonsService } from 'src/app/services/xuxemons.service';
import { TokenService } from '../../../../../services/token.service';
import { ChuchesService } from '../../../../../services/chuches.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-curar',
  templateUrl: './curar.component.html',
  styleUrls: ['./curar.component.css']
})
// imports extras //

export class CurarComponent {
  alimentForm: FormGroup;
  xuxeData: any;
  chuchesList: any[] = [];
  cumpleEvo1: boolean = false;
  cumpleEvo2: boolean = false;

  constructor(
    private fb: FormBuilder,
    public xuxemonsService: XuxemonsService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService,
    private chuchesService: ChuchesService
  ) {
    this.alimentForm = this.fb.group({
      chucheSeleccionada: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getChuches()

    this.route.queryParams.subscribe((params) => {
      this.xuxeData = {
        id: params['id'],
        nombre: params['nombre'],
        archivo: params['archivo'],
        tamano: params['tamano'],
      };
    });
  }

  /**
   * Nombre: alimentarXuxemon
   * Función: envia los parametros necesarios para ejecutar la evolución
   * @param newAlimentData
   */
  alimentarXuxemon(newAlimentData: number) {
    const newXuxeData = parseInt(this.xuxeData.id);
    // const newAlimentData = parseInt(this.alimentForm.value['chucheSeleccionada']);

    this.xuxemonsService.alimentar(newXuxeData, newAlimentData).subscribe({
      next: (returns) => {
        console.log('Este sale por el next: ' + returns);
        this.cumpleEvo1 = returns.cumpleEvo1;
        this.cumpleEvo2 = returns.cumpleEvo2;
        // alert('Le ha gustado el alimento.');
        console.log('Este es el de evo 1: ' + returns.cumpleEvo1);
        console.log('Este es el de evo 2: ' + returns.cumpleEvo2);
        this.getChuches();
        // this.ngOnInit();
      },
      error: (error) => {
        console.log('Esta saliendo por el erros: ' + error);
        // alert('No quiere tu mierda de chuche.');
        // throw new Error(error);
      },
    });
  }

  /**
   * Nombre: alimentarXuxemon
   * Función: para editar el Xuxemon
   * @param xuxeUser
   */
  accionCumpleEvo1() {
    const newXuxeData = parseInt(this.xuxeData.id);

    this.xuxemonsService
      .evolucionarXuxemon(newXuxeData, this.cumpleEvo1)
      .subscribe({
        next: (returns) => {
          console.log(returns);
          this.cumpleEvo1 = returns.cumpleEvo1;
          this.cumpleEvo2 = returns.cumpleEvo2;
          alert('Evolucionado con éxito!');
          this.ngOnInit();
        },
        error: (error) => {
          alert('No quiere evolucionar.');
          throw new Error(error);
        },
      });
  }

  /**
   * Nombre: alimentarXuxemon
   * Función: para editar el Xuxemon
   * @param xuxeUser
   */
  accionCumpleEvo2() {
    const newXuxeData = parseInt(this.xuxeData.id);

    this.xuxemonsService
      .evolucionarXuxemon2(newXuxeData, this.cumpleEvo2)
      .subscribe({
        next: () => {
          alert('Evolucionado con éxito!');
          this.ngOnInit();
          this.router.navigate(['/home/home/xuxemons/caja']);
        },
        error: (error) => {
          alert('No quiere evolucionar.');
          throw new Error(error);
        },
      });
  }

  /**
   * Nombre: alimentarXuxemon
   * Función: para editar el Xuxemon
   */
  getChuches() {
    const userToken = this.tokenService.getToken();

    if (userToken !== null) {
      this.chuchesService.getAllChuchesUser(userToken).subscribe({
        next: (chuchesUser: any) => {
          this.chuchesList = chuchesUser[0];
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
   * Nombre: getImageStyle
   * Función: 
   * @param tamano
   * @returns width
   */
  getImageStyle(tamano: string): any {
    let width: number;
    const paqueno = 50;
    const mediano = 100;
    const grande = 150;

    switch (tamano) {
      case 'pequeno': width = paqueno; break;
      case 'mediano': width = mediano; break;
      case 'grande': width = grande; break;
      default: width = grande; break;
    }
    return {
      'width.px': width,
    };
  }

}
