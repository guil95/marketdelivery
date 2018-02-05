import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario.component';
import { NgModule } from '@angular/core';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
              path: '',
              component: UsuarioComponent
            }
          ])
    ],
    exports: [ RouterModule ]
})
export class UsuarioRoutingModule{}