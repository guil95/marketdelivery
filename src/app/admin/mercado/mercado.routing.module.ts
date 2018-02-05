import { RouterModule, Routes } from '@angular/router';
import { MercadoComponent } from './mercado.component';
import { NgModule } from '@angular/core';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
              path: '',
              component: MercadoComponent
            }
          ])
    ],
    exports: [ RouterModule ]
})
export class MercadoRoutingModule{}