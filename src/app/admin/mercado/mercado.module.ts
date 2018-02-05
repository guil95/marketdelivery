import { MercadoComponent } from './mercado.component';

import { HttpModule } from '@angular/http';
import { InterceptorHttp } from './../../services/InterceptorHttp.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MercadoRoutingModule } from './mercado.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MercadoRoutingModule,
    HttpModule,
    DataTablesModule,
    HttpClientModule,
  ],
  declarations: [
   MercadoComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorHttp,
      multi: true,
    },
  ]
})
export class MercadoModule { }
