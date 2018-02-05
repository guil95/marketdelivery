import { ConfiguracaoComponent } from './configuracao.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
              path: '',
              component: ConfiguracaoComponent
            }
          ])
    ],
    exports: [ RouterModule ]
})
export class ConfiguracaoRoutingModule{}