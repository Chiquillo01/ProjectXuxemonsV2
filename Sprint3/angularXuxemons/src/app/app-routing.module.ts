import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Importamos las rutas de nuestros componentes //
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: 'landingPage',
  // },
  {
    path: 'login',
    component: LoginComponent,
  },
  { 
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'landingPage',
    component: LandingComponent,
    //canActivate: const [AngularFireAuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
    //canActivate: const [AngularFireAuthGuard]
  },
  {
    path: '**',
    redirectTo: 'landingPage',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
