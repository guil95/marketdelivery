import { LoginComponent } from './login.component';
import { HttpModule } from '@angular/http';
import { InterceptorHttp } from './../services/InterceptorHttp.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    HttpModule,
    DataTablesModule,
    HttpClientModule,
  ],
  declarations: [
   LoginComponent
  ],
  providers: [

    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorHttp,
      multi: true,
    },
  ]
})
export class LoginModule{ }
