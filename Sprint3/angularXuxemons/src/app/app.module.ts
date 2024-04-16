import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { MainComponent } from './main/main.component';
import { ErrorComponent } from './main/error/error.component';
import { FooterComponent } from './main/footer/footer.component';
import { HeaderComponent } from './main/header/header.component';
import { HomeComponent } from './main/home/home.component';
import { HospitalComponent } from './main/hospital/hospital.component';
import { InventarioComponent } from './main/inventario/inventario.component';
import { TiendaComponent } from './main/tienda/tienda.component';
import { XuxemonsComponent } from './main/xuxemons/xuxemons.component';
import { ChuchesComponent } from './main/inventario/chuches/chuches.component';
import { ObjetosComponent } from './main/inventario/objetos/objetos.component';
import { CajaComponent } from './main/xuxemons/caja/caja.component';
import { XuxedexComponent } from './main/xuxemons/xuxedex/xuxedex.component';
import { CrearComponent } from './main/xuxemons/xuxedex/crear/crear.component';
import { EditarComponent } from './main/xuxemons/xuxedex/editar/editar.component';
import { AlimentarComponent } from './main/xuxemons/caja/alimentar/alimentar.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    RegistroComponent,
    MainComponent,
    ErrorComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    HospitalComponent,
    InventarioComponent,
    TiendaComponent,
    XuxemonsComponent,
    ChuchesComponent,
    ObjetosComponent,
    CajaComponent,
    XuxedexComponent,
    CrearComponent,
    EditarComponent,
    AlimentarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
