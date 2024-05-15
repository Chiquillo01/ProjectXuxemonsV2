import { Component } from '@angular/core';
// Imports extras //
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { XuxemonsService } from 'src/app/services/xuxemons.service';
import { TokenService } from '../../services/token.service';
import { Users } from 'src/app/models/users/users.model';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css'],
})
export class ProfileUserComponent {
  User: Users[] = [];
  userRole: Number | null;
  foto: string | ArrayBuffer | null = null;

  constructor(
    public userService: UsersService,
    public xuxemonsService: XuxemonsService,
    public UsersService: UsersService,
    public tokenService: TokenService,
    private router: Router
  ) {
    this.userRole = this.tokenService ? this.tokenService.getRole() : null;
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const userToken = this.tokenService.getToken();

    if (userToken !== null) {
      this.UsersService.getUsuario(userToken).subscribe({
        next: (user: Users[]) => {
          this.User = user;
          // this.getRequest();
          console.log(user);
        },
        error: (error) => {
          console.error('Error al obtener tu usuario:', error);
        },
      });
    } else {
      console.error('User ID is null');
    }
  }

  onFileInputClick(): void {
    const inputElement = document.querySelector('input[type="file"]');
    if (inputElement) {
      (inputElement as HTMLInputElement).click();
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.foto = reader.result;
    };
    reader.readAsDataURL(file);
    this.saveImg(this.foto);
  }

  saveImg(img: any) {
    const userToken = this.tokenService.getToken();

    if (userToken !== null) {
      this.UsersService.saveImage(userToken, img).subscribe({
        next: () => {
          this.getUser();
        },
        error: (error) => {
          console.error('Error al obtener tu usuario:', error);
        },
      });
    } else {
      console.error('User ID is null');
    }
  }

  logout() {
    // Elimina el token de autenticación y el rol del usuario del localStorage
    this.tokenService.removeToken();
    this.tokenService.removeRole();

    // Redirige a la página de inicio de sesión
    this.router.navigate(['/landingPage']);
  }
}
