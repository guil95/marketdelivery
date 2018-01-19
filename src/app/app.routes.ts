import { Routes } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { HomeComponent } from './home/home.component'
import { MercadoComponent } from './mercado/mercado.component'
import { UsuarioComponent } from './usuario/usuario.component'
import { ConfiguracaoComponent } from './configuracao/configuracao.component'

export const ROUTES: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent},
    { path: 'usuario', component: UsuarioComponent },
    { path: 'mercado', component: MercadoComponent },
    { path: 'configuracao', component: ConfiguracaoComponent },
]
