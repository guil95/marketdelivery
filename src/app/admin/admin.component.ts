import { Router } from '@angular/router';
import { CrudService } from './../services/crud.service';
import { URL_API_USUARIOS_CHECK_AUTH } from './../app.api';
import { InterceptorHttp } from './../services/InterceptorHttp.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  loading = false

  constructor(
    private crudService: CrudService, 
    private router: Router) {
    InterceptorHttp.mostrarLoading.subscribe((ret) => {
      this.loading = ret;
    });
   
   }

  ngOnInit() {
 
  }

  public sair(){
    
    localStorage.setItem('token','')
    this.router.navigate(['/login'])
  }
}
