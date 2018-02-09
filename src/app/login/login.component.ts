import { Router } from '@angular/router';
import { Usuario } from './../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms'
import { Validators } from '@angular/forms';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public erro: Array<any> = []
  public randomClass: any
  

  constructor(
    private authService: AuthService,
    private route: Router
  ) {
    
    if(localStorage.getItem('token')){
      this.route.navigate(['/admin'])
    }
   }

  ngOnInit() {
    this.erro['msg'] = ''
    let random = Math.floor(Math.random() * 3) + 1
    this.randomClass = "bgBody" + random

  }

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  public autenticar():void{
    if(this.formulario.invalid){
      this.formulario.get('email').markAsTouched()
      this.formulario.get('senha').markAsTouched()
    }
    this.erro['senha'] = this.formulario.get('senha').invalid ? true : false
    this.erro['email'] = this.formulario.get('email').invalid ? true : false

    if(this.erro['senha'] == true || this.erro['email'] == true){
      this.erro['msg'] = 'Preencha os campos corretamente!!'
    }

    this.authService.autenticar({
        login : this.formulario.get('email').value,
        senha : this.formulario.get('senha').value
    })

    
  }
}
