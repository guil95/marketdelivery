import { CrudService } from './../services/crud.service';

import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { AuthService } from '../login/auth.service';
import { URL_API_USUARIOS_CHECK_AUTH } from '../app.api';


@Injectable()
export class AuthGuard implements CanActivate {

  public logado

  constructor(
    private authService: AuthService,
    private router: Router,
    private crudService: CrudService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable<boolean> | boolean {

      // if(this.authService.usuarioEstaAutenticado()){
      //   return true
      // }else{
      //   this.router.navigate(['/login'])
       
      //   return false
      // }

     return this.crudService.get<any>( 
        URL_API_USUARIOS_CHECK_AUTH
      ).map(
        (ret) => 
          ret.logado
      )

   
  }

}


