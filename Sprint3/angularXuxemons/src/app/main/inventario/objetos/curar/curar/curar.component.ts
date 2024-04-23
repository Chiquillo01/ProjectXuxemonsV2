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
    this.getEnfermos()

    this.route.queryParams.subscribe((params) => {
      this.curaData = {
        id: params['id'],
        nombre: params['nombre'],
        archivo: params['archivo'],
      };
    });
  }

  /**
   * Nombre: alimentarXuxemon
   * Función: para editar el Xuxemon
   */
  getEnfermos() {
    const userToken = this.tokenService.getToken();

    if (userToken !== null) {
      this.curarService.getAllEnfermosUser(userToken).subscribe({
        next: (xuxemons: any) => {
          this.XuxemonsList = xuxemons;
          // this.getXuxemons();
          console.log(this.XuxemonsList);
          console.log(xuxemons[0]);
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

}

