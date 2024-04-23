import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { XuxemonsService } from 'src/app/services/xuxemons.service';
import { TokenService } from '../../../../../services/token.service';
import { CurarService } from '../../../../../services/curar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { XuxemonsUsers } from 'src/app/models/xuxemons/xuxemons.model';

@Component({
  selector: 'app-curar',
  templateUrl: './curar.component.html',
  styleUrls: ['./curar.component.css']
})
// imports extras //

export class CurarComponent {
  alimentForm: FormGroup;
  curaData: any;
  XuxemonsList: XuxemonsUsers[] = [];
  curaId: any;

  constructor(
    private fb: FormBuilder,
    public xuxemonsService: XuxemonsService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService,
    private curarService: CurarService
  ) {
    this.alimentForm = this.fb.group({
      chucheSeleccionada: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.curaData = {
        id: params['id'],
        nombre: params['nombre'],
        archivo: params['archivo'],
      };
      this.curaId = params['id'];
      this.getEnfermos();
    });
    
  }

  /**
   * Nombre: alimentarXuxemon
   * Función: para editar el Xuxemon
   */
  getEnfermos() {
    const userToken = this.tokenService.getToken();
    // const enfId = this.curaId;
    // console.log(enfId);
    console.log(this.curaId);

    if (userToken !== null) {
      this.curarService.getAllEnfermosUser(userToken, this.curaId).subscribe({
        next: (xuxemons: any) => {
          this.XuxemonsList = xuxemons;
          // this.getXuxemons();
          console.log(this.XuxemonsList);
          console.log(xuxemons);
        },
        error: (error) => {
          console.error('Error fetching Xuxemons:', error);
        },
      });
    } else {
      console.error('User ID is null');
    }
  }

  curar(xuxeUser: any){
    const userToken = this.tokenService.getToken();
    const xuxemon_id = xuxeUser.xuxemon_id;

    this.curarService.curarEnf(userToken!, xuxemon_id, this.curaId).subscribe({
      next: () => {
        // alert('Se ha curado');
        this.getEnfermos();
      },
      error: (error) => {
        alert('No quiere tu mierda de chuche.');
        throw new Error(error);
      },
    });
  }

}

