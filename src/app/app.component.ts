import { Component, OnInit } from '@angular/core';
import { ControlMenuService } from './services/control-menu.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private controlMenu: ControlMenuService){}

  ngOnInit() {
    this.controlMenu.mostrarMenu = true
  }

  title = 'app';
}
