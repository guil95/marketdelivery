import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { AuthGuard } from './guards/auth.guard';

export const ROUTES: Routes = [
    {
         path: '', 
         loadChildren: "app/login/login.module#LoginModule"
    },
    {
         path: 'login', 
         loadChildren: "app/login/login.module#LoginModule" 
    },
    { 
        path: 'admin', 
        loadChildren: "app/admin/admin.module#AdminModule",
        canActivate: [ AuthGuard ]
    },
    { 
        path: '**', 
        loadChildren: "app/not-found/not-found.module#NotFoundModule" 
     }
]


@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES)
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule{

}