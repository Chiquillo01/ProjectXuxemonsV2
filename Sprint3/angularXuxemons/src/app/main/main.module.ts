import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main.component';
import { ConfigComponent } from './header/config/config.component';
import { HomeComponent } from './home/home.component';
import { HospitalComponent } from './hospital/hospital.component';
import { InventarioComponent } from './inventario/inventario.component';
import { ChuchesComponent } from './inventario/chuches/chuches.component';
import { TiendaComponent } from './tienda/tienda.component';
import { XuxemonsComponent } from './xuxemons/xuxemons.component';
import { XuxedexComponent } from './xuxemons/xuxedex/xuxedex.component';
import { CrearComponent } from './xuxemons/xuxedex/crear/crear.component';
import { EditarComponent } from './xuxemons/xuxedex/editar/editar.component';
import { CajaComponent } from './xuxemons/caja/caja.component';
import { AlimentarComponent } from './xuxemons/caja/alimentar/alimentar.component';
import { ObjetosComponent } from './inventario/objetos/objetos.component';
import { CurarComponent } from './inventario/objetos/curar/curar/curar.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'config', component: ConfigComponent },
      { path: 'home', component: HomeComponent },
      { path: 'hospital', component: HospitalComponent },
      { path: 'inventario', component: InventarioComponent },
      { path: 'chuches', component: ChuchesComponent },
      { path: 'objetos', component: ObjetosComponent },
      { path: 'inventario/objetos/curar', component: CurarComponent },
      { path: 'tienda', component: TiendaComponent },
      { path: 'xuxemons', component: XuxemonsComponent },
      { path: 'xuxedex', component: XuxedexComponent },
      { path: 'crear', component: CrearComponent },
      { path: 'editar', component: EditarComponent },
      { path: 'caja', component: CajaComponent },
      { path: 'alimentar', component: AlimentarComponent },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule,],
  exports: [RouterModule,],
  declarations: [
    XuxedexComponent,
    ChuchesComponent,
    ObjetosComponent,
    CajaComponent,
    ConfigComponent,
    AlimentarComponent,
    CurarComponent,
  ],
})
export class MainModule { }
