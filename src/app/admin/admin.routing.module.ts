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
                component: UsuarioComponent
            },
            { 
                path: 'mercado', 
                loadChildren: "app/admin/mercado/mercado.module#MercadoModule" 
            },
            { 
                path: 'configuracao', 
                loadChildren: "app/admin/configuracao/configuracao.module#ConfiguracaoModule"  
            },
            { 
                path: 'home', 
                loadChildren: "app/admin/home/home.module#HomeModule"  
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