import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
              path: '',
              component: HomeComponent
            }
          ])
    ],
    exports: [ RouterModule ]
})
export class HomeRoutingModule{}