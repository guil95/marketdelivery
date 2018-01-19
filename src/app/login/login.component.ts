import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms'
import { Validators } from '@angular/forms';
import { ControlMenuService } from '../services/control-menu.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public erro: Array<any> = []

  constructor(private controlMenu: ControlMenuService) {
    this.controlMenu.mostrarMenu = false
   }

  ngOnInit() {
    this.erro['msg'] = ''
   
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
  }
}
