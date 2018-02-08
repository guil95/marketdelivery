
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { AuthService } from '../login/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable<boolean> | boolean {
    
    console.log(this.authService.usuarioEstaAutenticado())

    if(this.authService.usuarioEstaAutenticado()){
      return true
    }else{

      this.router.navigate(['/login'])
      
      return false
    }

  }

}
