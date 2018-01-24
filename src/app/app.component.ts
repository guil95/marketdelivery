import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { ControlMenuService } from './services/control-menu.service'
import { LoadingService } from './services/loading.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    public controlMenu: ControlMenuService,
    public loading: LoadingService
  ){}

  ngOnInit() {
    this.controlMenu.mostrarMenu = true
    this.loading.mostrarLoading = false
  }

  title = 'app';
}
