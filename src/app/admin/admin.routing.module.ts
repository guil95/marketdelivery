import { AuthGuard } from './../guards/auth.guard';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { MercadoComponent } from './mercado/mercado.component';

export const ROUTES: Routes = [
    { 
        path: '', 
        component: AdminComponent,
        children:[
            { 
                path: 'usuario', 
                loadChildren: "app/admin/usuario/usuario.module#UsuarioModule", 
                canActivate: [ AuthGuard ]
            },
            { 
                path: 'mercado', 
                loadChildren: "app/admin/mercado/mercado.module#MercadoModule", 
                canActivate: [ AuthGuard ]
            },
            { 
                path: 'configuracao', 
                loadChildren: "app/admin/configuracao/configuracao.module#ConfiguracaoModule", 
                canActivate: [ AuthGuard ]
            },
            { 
                path: 'home', 
                loadChildren: "app/admin/home/home.module#HomeModule",
                canActivate: [ AuthGuard ]  
            },
            { 
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
        ] 
    },
        
]


@NgModule({
    imports: [
        RouterModule.forChild(ROUTES)
    ],
    exports: [ RouterModule ]
})
export class AdminRoutingModule{}