import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { ControlMenuService } from './services/control-menu.service'
import { InterceptorHttp } from './services/InterceptorHttp.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loading = false;

  constructor(
    public controlMenu: ControlMenuService,

  ){}

  ngOnInit() {
    this.controlMenu.mostrarMenu = true
    InterceptorHttp.mostrarLoading.subscribe((ret) => {
      console.log(ret)
      this.loading = ret;
    });
  }

  title = 'app';
}
