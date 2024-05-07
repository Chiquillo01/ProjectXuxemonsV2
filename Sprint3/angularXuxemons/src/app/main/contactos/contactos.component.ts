import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../../services/token.service';
import { ContactosService } from '../../services/contactos.service';
import { UsersService } from '../../services/users.service';
import { Users } from '../../models/users/users.model';
import { UsersRequest } from '../../models/usersRequest/usersRequest.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css'],
})
export class ContactosComponent implements OnInit {
  Users: Users[] = [];
  User: Users[] = [];
  Requests: UsersRequest[] = [];
  userRol!: number;
  ContactosForm: FormGroup;
  otherUserId: any;

  constructor(
    private fb: FormBuilder,
    private tokenService: TokenService,
    private ContactosService: ContactosService,
    private UsersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.ContactosForm = this.fb.group({
      id: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getUser();
    this.getRequest();
    this.route.queryParams.subscribe((params) => {
      this.otherUserId = {
        id: params['id'],
      };
    });

    // Seteamos los valores //
    this.ContactosForm.setValue({
      id: this.otherUserId.id || '',
    });
  }

  getRequest() {
    const userToken = this.tokenService.getToken();

    if (userToken !== null) {
      this.ContactosService.getAllRequest(userToken).subscribe({
        next: (requests: any[]) => {
          // Cambia any por el tipo correcto si lo conoces
          this.Requests = requests; // Asigna toda la matriz de solicitudes
          console.log('Info request:');
          console.log(requests); // Muestra toda la matriz en la consola
        },
        error: (error) => {
          console.error('Error fetching Xuxemons:', error);
        },
      });
    }
  }

  // getUsuario
  getUser(){
    const userToken = this.tokenService.getToken();

    if (userToken !== null) {
      this.UsersService.getUsuario(userToken).subscribe({
        next: (users: any[]) => {
          this.Users = users;
          this.getRequest();
        },
        error: (error) => {
          console.error('Error fetching Xuxemons:', error);
        },
      });
    } else {
      console.error('User ID is null');
    }
  }

  getUsers() {
    const userToken = this.tokenService.getToken();
    const id = this.ContactosForm.value;
    console.log('userToken getChuches: ' + userToken);
    console.log('Id del formulario:', id);

    if (userToken !== null && id !== null) {
      this.ContactosService.getAllUsers(userToken, id).subscribe({
        next: (users: any) => {
          this.Users = users[0];
          this.getRequest();
        },
        error: (error) => {
          console.error('Error fetching Xuxemons:', error);
        },
      });
    } else {
      console.error('User ID is null');
    }
  }

  acceptar(id: string) {
    const userToken = this.tokenService.getToken();
    // const id = this.ContactosForm.value;
    console.log('userToken getChuches: ' + userToken);
    console.log('Id del usuario:', id);

    if (userToken !== null && id !== null) {
      this.ContactosService.acceptar(userToken, id).subscribe({
        next: (response: any) => {
          console.log(response.message);
          this.getRequest();
        },
        error: (error) => {
          console.error('Error fetching Xuxemons:', error);
        },
      });
    } else {
      console.error('User ID is null');
    }
  }

  denegar(id: string) {
    const userToken = this.tokenService.getToken();
    // const id = this.ContactosForm.value;
    console.log('userToken getChuches: ' + userToken);
    console.log('Id del usuario:', id);

    if (userToken !== null && id !== null) {
      this.ContactosService.denegar(userToken, id).subscribe({
        next: (response: any) => {
          console.log(response.message);
          this.getRequest();
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
