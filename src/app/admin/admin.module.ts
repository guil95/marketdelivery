import { HttpModule } from '@angular/http';
import { InterceptorHttp } from './../services/InterceptorHttp.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { UsuarioComponent } from './usuario/usuario.component';
import { AdminRoutingModule } from './admin.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    HttpModule,
    DataTablesModule,
    HttpClientModule,
  ],
  declarations: [
    AdminComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorHttp,
      multi: true,
    },
  ]
})
export class AdminModule{ }
