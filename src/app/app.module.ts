import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import  { ReactiveFormsModule } from '@angular/forms'
import { RouterModule} from '@angular/router'
import { ControlMenuService } from './services/control-menu.service'
import { MercadoService } from './services/mercado.service'
import { DataTablesModule } from 'angular-datatables'

import { ROUTES } from './app.routes'


import {InterceptorHttp} from './services/InterceptorHttp.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MercadoComponent } from './mercado/mercado.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ConfiguracaoComponent } from './configuracao/configuracao.component';
import { HttpModule } from '@angular/http';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MercadoComponent,
    UsuarioComponent,
    ConfiguracaoComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    DataTablesModule,
    RouterModule.forRoot(ROUTES),
    HttpModule,
    HttpClientModule
  ],
  providers: [ 
    ControlMenuService, 
    MercadoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorHttp,
      multi: true,
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
