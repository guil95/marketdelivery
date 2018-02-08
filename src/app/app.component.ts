import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { InterceptorHttp } from './services/InterceptorHttp.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loading = false;

  constructor(


  ){}

  ngOnInit() {
    InterceptorHttp.mostrarLoading.subscribe((ret) => {
      console.log(ret)
      this.loading = ret;
    });
  }

  title = 'app';
}
