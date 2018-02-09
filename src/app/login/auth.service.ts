import { CrudService } from './../services/crud.service';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { URL_API_USUARIOS_LOGIN, URL_API_USUARIOS_CHECK_AUTH } from '../app.api';

@Injectable()
export class AuthService {
  private usuarioAutenticado: boolean = false
  public logado
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private crudService: CrudService
  ) { }

  public autenticar(usuario){
    //Fazer conexão com backend e realizar autenticação
    this.crudService.post<any>( 
      URL_API_USUARIOS_LOGIN,
      usuario
    ).subscribe(ret => {
      //salva token no storage
      this.usuarioAutenticado = true
      localStorage.setItem('token',ret.data['token'])
      this.router.navigate(['/admin'])
    }, (err) => {
        this.usuarioAutenticado = false

    })

  }

  // public usuarioEstaAutenticado(): boolean {
  //   if(localStorage.getItem('token')){
  //     return true
  //   }
  //   return false

  // }
}
