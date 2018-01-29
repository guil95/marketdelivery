import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import  { ReactiveFormsModule } from '@angular/forms'
import { RouterModule} from '@angular/router'
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';


import { ControlMenuService } from './services/control-menu.service'
import { LoadingService } from './services/loading.service'
import { ValidformService } from './services/validform.service'


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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { registerLocaleData } from "@angular/common";
import localePt from "@angular/common/locales/pt";
import { CrudService } from './services/crud.service';
registerLocaleData(localePt);


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
    HttpClientModule,
    ToastrModule.forRoot(),
    ToastContainerModule,
    BrowserAnimationsModule
  ],
  providers: [ 
    ControlMenuService, 
    LoadingService,
    ValidformService,
    CrudService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorHttp,
      multi: true,
    },
    {
      provide: LOCALE_ID, 
      useValue:'pt'
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
