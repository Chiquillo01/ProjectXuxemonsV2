import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { XuxemonsService } from 'src/app/services/xuxemons.service';
import { TokenService } from '../../../../../services/token.service';
import { ChuchesService } from '../../../../../services/chuches.service';
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
    private chuchesService: ChuchesService
  ) {
    this.alimentForm = this.fb.group({
      chucheSeleccionada: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getXuxemons()

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
  getXuxemons() {
    const userToken = this.tokenService.getToken();

    if (userToken !== null) {
      this.xuxemonsService.getAllXuxemonsUser(userToken).subscribe({
        next: (xuxemons: any) => {
          this.XuxemonsList = xuxemons[0];
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

