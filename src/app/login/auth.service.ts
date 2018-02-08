
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private usuarioAutenticado: boolean = false

  constructor(private router: Router) { }

  public autenticar(usuario){
    //Fazer conexão com backend e realizar autenticação
    console.log(usuario)
    if(usuario.login == 'a@a.com' && usuario.senha == '123456'){

      this.usuarioAutenticado = true

      this.router.navigate(['/admin'])

      console.log(this.usuarioAutenticado)
    } else {
      this.usuarioAutenticado = false
    }
  }

  public usuarioEstaAutenticado(): boolean {
    return this.usuarioAutenticado
  }
}
