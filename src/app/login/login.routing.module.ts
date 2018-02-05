import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
              path: '',
              component: LoginComponent
            }
          ])
    ],
    exports: [ RouterModule ]
})
export class LoginRoutingModule{}