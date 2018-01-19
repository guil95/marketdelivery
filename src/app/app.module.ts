import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import  { ReactiveFormsModule } from '@angular/forms'
import { RouterModule} from '@angular/router'
import { ControlMenuService } from './services/control-menu.service'

import { ROUTES } from './app.routes'


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MercadoComponent } from './mercado/mercado.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ConfiguracaoComponent } from './configuracao/configuracao.component';


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
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ ControlMenuService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
